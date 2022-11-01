// (C) 2022 GoodData Corporation
import React from "react";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { EllipsisText } from "./EllipsisText";
import { IMetadataListProps, MetadataList } from "./MetadataList";
import { Bubble, BubbleHoverTrigger } from "../Bubble";
import isEmpty from "lodash/isEmpty";

const ALIGN_POINTS = [
    { align: "cr cl" },
    { align: "bc tc" },
    { align: "tc bc" },
    { align: "cl cr" },
    { align: "tr tl" },
    { align: "tl tr" },
    { align: "br bl" },
    { align: "bl br" },
];
const ARROW_OFFSETS = {
    "cr cl": [0, 0],
    "bc tc": [0, 0],
    "tc bc": [0, 0],
    "cl cr": [0, 0],
    "tr tl": [0, 0],
    "tl tr": [0, 0],
    "br bl": [0, 0],
    "bl br": [0, 0],
};

/**
 * @internal
 */
export interface IDescriptionPanelProps extends IMetadataListProps {
    title?: string;
    description: string;
    locale?: string;
}

/**
 * @internal
 */
export const DescriptionPanel: React.FC<IDescriptionPanelProps> = (props) => (
    <IntlWrapper locale={props.locale}>
        <DescriptionPanelCore {...props} />
    </IntlWrapper>
);

/**
 * @internal
 */
export const DescriptionPanelContent: React.FC<IDescriptionPanelProps> = (props) => (
    <IntlWrapper locale={props.locale}>
        <DescriptionPanelContentCore {...props} />
    </IntlWrapper>
);

const DescriptionPanelCore: React.FC<IDescriptionPanelProps> = (props) => {
    return (
        <BubbleHoverTrigger showDelay={0} hideDelay={0}>
            <div className="gd-icon-circle-question" />
            <Bubble
                className="bubble-light gd-description-panel-bubble"
                alignPoints={ALIGN_POINTS}
                arrowOffsets={ARROW_OFFSETS}
                arrowStyle={{ display: "none" }}
            >
                <DescriptionPanelContentCore {...props} />
            </Bubble>
        </BubbleHoverTrigger>
    );
};

const DescriptionPanelContentCore: React.FC<IDescriptionPanelProps> = (props) => {
    const { title, description, metrics } = props;
    const longTitle = title && title.length > 50;
    const titleComponent =
        !isEmpty(title) && longTitle ? (
            <BubbleHoverTrigger showDelay={0} hideDelay={0}>
                {title.slice(0, 50) + "…"}
                <Bubble className="bubble-primary" arrowOffsets={ARROW_OFFSETS} alignPoints={ALIGN_POINTS}>
                    {title}
                </Bubble>
            </BubbleHoverTrigger>
        ) : (
            title
        );

    return (
        <div className="gd-description-panel">
            {title && <div className="gd-description-panel-title">{titleComponent}</div>}
            <EllipsisText text={description} />
            <MetadataList metrics={metrics} />
        </div>
    );
};
