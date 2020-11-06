// (C) 2019-2020 GoodData Corporation
import { IWorkspaceStylingService, ITheme, IThemeDefinition } from "@gooddata/sdk-backend-spi";
import { IColorPaletteItem } from "@gooddata/sdk-model";
import { GdcMetadataObject, GdcMetadata } from "@gooddata/api-model-bear";
import { BearAuthenticatedCallGuard } from "../../../types/auth";

import { convertTheme } from "../../../convertors/fromBackend/ThemeConverter";

const SELECTED_UI_THEME_SETTINGS_KEY = "selectedUiTheme";
const ENABLED_THEMING_FEATURE_FLAG_SETTINGS_KEY = "enableUiTheming";

export class BearWorkspaceStyling implements IWorkspaceStylingService {
    constructor(private readonly authCall: BearAuthenticatedCallGuard, public readonly workspace: string) {}

    public getColorPalette = async (): Promise<IColorPaletteItem[]> => {
        const palette = await this.authCall((sdk) => sdk.project.getColorPaletteWithGuids(this.workspace));
        return palette || [];
    };

    public getTheme = async (): Promise<IThemeDefinition> => {
        const featureFlags = await this.authCall((sdk) => sdk.user.getFeatureFlags());
        const enabledByFeatureFlag = featureFlags?.[ENABLED_THEMING_FEATURE_FLAG_SETTINGS_KEY];
        if (!enabledByFeatureFlag) {
            return {};
        }

        const config = await this.authCall((sdk) => sdk.project.getConfig(this.workspace));
        const identifier = config.find((item) => item.settingItem.key === SELECTED_UI_THEME_SETTINGS_KEY)
            ?.settingItem?.value;

        if (!identifier) {
            return {};
        }

        const object = await this.authCall((sdk) => sdk.md.getObjectByIdentifier(this.workspace, identifier));
        const unwrappedObject = GdcMetadataObject.unwrapMetadataObject(object);
        return (GdcMetadata.isTheme(unwrappedObject) && unwrappedObject.content) || {};
    };

    public getThemes = async (): Promise<ITheme[]> => {
        const featureFlags = await this.authCall((sdk) => sdk.user.getFeatureFlags());
        const enabledByFeatureFlag = featureFlags?.[ENABLED_THEMING_FEATURE_FLAG_SETTINGS_KEY];
        if (!enabledByFeatureFlag) {
            return [];
        }

        const themeObjects = await this.authCall((sdk) =>
            sdk.md.getObjectsByQuery<GdcMetadata.IWrappedTheme>(this.workspace, {
                category: "theme",
            }),
        );

        const unwrappedObjects = themeObjects.map(
            (themeObject: GdcMetadata.IWrappedTheme) => themeObject.theme,
        );
        return unwrappedObjects.map(convertTheme);
    };
}
