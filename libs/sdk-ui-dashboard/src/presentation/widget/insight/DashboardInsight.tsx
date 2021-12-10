// (C) 2020-2021 GoodData Corporation
import React, { useMemo } from "react";

import { useDashboardComponentsContext } from "../../dashboardContexts";
import { IDashboardInsightProps } from "./types";

/**
 * @internal
 */
export const DashboardInsight = (props: IDashboardInsightProps): JSX.Element => {
    const { insight, widget } = props;
    const { InsightComponentProvider } = useDashboardComponentsContext();
    // TODO select from state
    const renderMode = "view";
    const InsightComponent = useMemo(
        () => InsightComponentProvider(insight, widget, renderMode),
        [InsightComponentProvider, insight, widget, renderMode],
    );

    return <InsightComponent {...props} />;
};
