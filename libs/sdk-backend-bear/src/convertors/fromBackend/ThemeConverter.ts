// (C) 2020 GoodData Corporation
import { GdcMetadata } from "@gooddata/api-model-bear";
import { ITheme } from "@gooddata/sdk-backend-spi";

/**
 *
 * @internal
 */
export const convertTheme = (theme: GdcMetadata.ITheme): ITheme => {
    const { content, meta } = theme;
    return {
        identifier: meta.identifier!,
        title: meta.title,
        uri: meta.uri!,
        updated: meta.updated,
        isLocked: meta.locked,
        ...content,
    };
};
