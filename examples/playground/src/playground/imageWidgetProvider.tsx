// (C) 2021 GoodData Corporation

import React from "react";
import { IDashboardInsightProps, OptionalInsightComponentProvider } from "@gooddata/sdk-ui-dashboard";
import { IInsightWidget } from "@gooddata/sdk-backend-spi";
import { IInsight } from "@gooddata/sdk-model";

function kitty(_props: IDashboardInsightProps): JSX.Element {
    return <img src="https://www.superzoo.cz/db/wysiwyg/Image/clanky/kote-clanek.jpg" />;
}

function puppy(_props: IDashboardInsightProps): JSX.Element {
    return <img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" />;
}

export const imageWidgetProvider: OptionalInsightComponentProvider = (
    _insight: IInsight,
    widget: IInsightWidget,
    renderMode: any,
) => {
    if (widget.title === "image") {
        if (renderMode === "view") {
            return kitty;
        }
        return puppy;
    }
    return undefined;
};
