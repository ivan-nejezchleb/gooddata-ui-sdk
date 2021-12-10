// (C) 2020-2021 GoodData Corporation
import React, { useMemo } from "react";

import { useDashboardComponentsContext } from "../../dashboardContexts";
import { selectRenderMode, useDashboardSelector } from "../../../model";
import { IDashboardInsightMenuProps } from "./types";

/**
 * @internal
 */
export const DashboardInsightMenu = (props: IDashboardInsightMenuProps): JSX.Element => {
    const { insight, widget } = props;
    const { InsightMenuComponentProvider } = useDashboardComponentsContext();
    const renderMode = useDashboardSelector(selectRenderMode);
    const InsightMenuComponent = useMemo(
        () => InsightMenuComponentProvider(insight, widget, renderMode),
        [InsightMenuComponentProvider, insight, widget, renderMode],
    );

    return <InsightMenuComponent {...props} />;
};
