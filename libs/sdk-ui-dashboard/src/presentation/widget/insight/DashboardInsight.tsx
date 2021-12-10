// (C) 2020-2021 GoodData Corporation
import React, { useMemo } from "react";

import { useDashboardComponentsContext } from "../../dashboardContexts";
import { selectRenderMode, useDashboardSelector } from "../../../model";
import { IDashboardInsightProps } from "./types";

/**
 * @internal
 */
export const DashboardInsight = (props: IDashboardInsightProps): JSX.Element => {
    const { insight, widget } = props;
    const { InsightComponentProvider } = useDashboardComponentsContext();
    const renderMode = useDashboardSelector(selectRenderMode);
    const InsightComponent = useMemo(
        () => InsightComponentProvider(insight, widget, renderMode),
        [InsightComponentProvider, insight, widget, renderMode],
    );

    return <InsightComponent {...props} />;
};
