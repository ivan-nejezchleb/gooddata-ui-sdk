// (C) 2021 GoodData Corporation

import React from "react";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";
import { ThemedLoadingEqualizer } from "@gooddata/sdk-ui-dashboard/dist/presentation/presentationComponents";
import { ErrorComponent } from "@gooddata/sdk-ui";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import {
    DashboardContext,
    DashboardPluginV1,
    IDashboardCustomizer,
    newDashboardSection,
    newDashboardItem,
    newCustomWidget,
} from "@gooddata/sdk-ui-dashboard";
import { imageWidgetProvider } from "./imageWidgetProvider";
import { ColorWidgetView, ColorWidgetEdit } from "./ColorWidget";

interface IPlayDashboardProps {
    backend: IAnalyticalBackend;
}

// sample plugin, see other parts of the docs on more details on how to write these
class LocalPlugin extends DashboardPluginV1 {
    author = "your name";
    displayName = "plugin display name"; // useful for debugging
    version = "1.0"; // or whatever version you want

    register(_ctx: DashboardContext, customize: IDashboardCustomizer) {
        customize.insightWidgets().withCustomProvider(imageWidgetProvider);
        customize.customWidgets().addCustomWidget("ColorWidget", ColorWidgetView, ColorWidgetEdit);
        customize.layout().customizeFluidLayout((_layout, customizer) => {
            customizer.addSection(
                1,
                newDashboardSection(
                    "Colors are here!",
                    newDashboardItem(newCustomWidget("colorWidget1", "ColorWidget"), {
                        xl: {
                            // all 12 columns of the grid will be 'allocated' for this this new item
                            gridWidth: 12,
                            // minimum height since the custom widget now has just some one-liner text
                            gridHeight: 1,
                        },
                    }),
                ),
            );
        });
    }
}

const LocalExtraPlugin = {
    factory: () => new LocalPlugin(),
};

export const PlayDashboard: React.FC<IPlayDashboardProps> = (props) => {
    const {
        status: dashboardStatus,
        result: dashboardResult,
        error: dashboardError,
    } = useDashboardLoader({
        backend: props.backend,
        dashboard: "aaclpVqd3mPZ",
        workspace: "mbuumy476p78ybcceiru61hcyr8i8lo8",
        loadingMode: "staticOnly",
        extraPlugins: LocalExtraPlugin,
    });

    const isDashboardLoading = dashboardStatus === "loading" || dashboardStatus === "pending";

    if (isDashboardLoading) {
        return <ThemedLoadingEqualizer />;
    }

    const DashboardComponent = dashboardResult?.DashboardComponent;

    if (dashboardError || !DashboardComponent) {
        return <ErrorComponent message={dashboardError.message || "DashboardComponent is empty."} />;
    }

    return (
        <DashboardComponent
            {...dashboardResult!.props}
            customizationFns={{
                checkRenderModeSwitch: () => (Math.random() > 0.5 ? "nasrat" : true),
            }}
        />
    );
};
