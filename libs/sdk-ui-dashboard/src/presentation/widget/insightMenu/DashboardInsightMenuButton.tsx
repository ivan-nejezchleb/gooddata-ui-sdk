// (C) 2020-2021 GoodData Corporation
import React, { useMemo } from "react";

import { useDashboardComponentsContext } from "../../dashboardContexts";
import { IDashboardInsightMenuButtonProps } from "./types";

/**
 * @internal
 */
export const DashboardInsightMenuButton = (props: IDashboardInsightMenuButtonProps): JSX.Element => {
    const { insight, widget } = props;
    const { InsightMenuButtonComponentProvider } = useDashboardComponentsContext();
    // TODO select from state
    const renderMode = "view";
    const InsightMenuButtonComponent = useMemo(
        () => InsightMenuButtonComponentProvider(insight, widget, renderMode),
        [InsightMenuButtonComponentProvider, insight, widget, renderMode],
    );

    return <InsightMenuButtonComponent {...props} />;
};
