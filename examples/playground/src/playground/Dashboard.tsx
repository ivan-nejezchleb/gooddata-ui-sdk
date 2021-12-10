// (C) 2021 GoodData Corporation

import React from "react";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";
import { ThemedLoadingEqualizer } from "@gooddata/sdk-ui-dashboard/dist/presentation/presentationComponents";
import { ErrorComponent } from "@gooddata/sdk-ui";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";

interface IPlayDashboardProps {
    backend: IAnalyticalBackend;
}

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
    });

    const isDashboardLoading = dashboardStatus === "loading" || dashboardStatus === "pending";

    if (isDashboardLoading) {
        return <ThemedLoadingEqualizer />;
    }

    const DashboardComponent = dashboardResult?.DashboardComponent;

    if (dashboardError || !DashboardComponent) {
        return <ErrorComponent message={dashboardError.message || "DashboardComponent is empty."} />;
    }

    return <DashboardComponent {...dashboardResult!.props} />;
};
