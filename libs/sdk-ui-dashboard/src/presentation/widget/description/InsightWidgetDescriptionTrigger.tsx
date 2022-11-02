// (C) 2022 GoodData Corporation
import React from "react";

import { DescriptionPanel } from "@gooddata/sdk-ui-kit";
import { IInsightWidgetDescriptionTriggerProps } from "./types";
// import { insightMeasures } from "@gooddata/sdk-model";

export const InsightWidgetDescriptionTrigger: React.FC<IInsightWidgetDescriptionTriggerProps> = ({
    widget,
    insight,
}) => {
    const visible = widget.configuration?.description?.visible;
    const description =
        widget.configuration?.description?.source === "widget" ? widget.description : insight.insight.summary;

    if (visible && description !== "") {
        const title = "";
        const includeMetrics = widget.configuration?.description?.includeMetrics;
        const metrics = includeMetrics ? [] : []; // includeMetrics ? insightMeasures(insight) : [];
        return <DescriptionPanel title={title} description={description || ""} metrics={metrics} />;
    }
    return null;
};
