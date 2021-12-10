// (C) 2020-2021 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts";
import { IDashboardKpiProps } from "./types";

/**
 * @internal
 */
export const DashboardKpi = (props: IDashboardKpiProps): JSX.Element => {
    const { KpiComponentProvider } = useDashboardComponentsContext();
    const { kpiWidget } = props;
    // TODO select from state
    const renderMode = "view";
    const KpiComponent = useMemo(
        () => KpiComponentProvider(kpiWidget.kpi, kpiWidget, renderMode),
        [KpiComponentProvider, kpiWidget, renderMode],
    );

    return <KpiComponent {...props} />;
};
