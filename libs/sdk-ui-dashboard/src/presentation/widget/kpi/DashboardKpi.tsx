// (C) 2020-2021 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts";
import { selectRenderMode, useDashboardSelector } from "../../../model";
import { IDashboardKpiProps } from "./types";

/**
 * @internal
 */
export const DashboardKpi = (props: IDashboardKpiProps): JSX.Element => {
    const { KpiComponentProvider } = useDashboardComponentsContext();
    const { kpiWidget } = props;
    const renderMode = useDashboardSelector(selectRenderMode);
    const KpiComponent = useMemo(
        () => KpiComponentProvider(kpiWidget.kpi, kpiWidget, renderMode),
        [KpiComponentProvider, kpiWidget, renderMode],
    );

    return <KpiComponent {...props} />;
};
