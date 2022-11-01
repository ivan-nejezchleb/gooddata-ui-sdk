// (C) 2022 GoodData Corporation
import React from "react";
import isEmpty from "lodash/isEmpty";
import { Bubble, BubbleHoverTrigger } from "../Bubble";
import { IMetadataObjectBase } from "@gooddata/sdk-model";
import { useIntl } from "react-intl";

const ARROW_OFFSETS = {
    "cr cl": [13, 0],
    "cl cr": [-13, 0],
    "tc bc": [0, -13],
    "bc tc": [0, 13],
};
const ALIGN_POINTS = [{ align: "cr cl" }, { align: "tc bc" }, { align: "bc tc" }, { align: "cl cr" }];

/**
 * @internal
 */
export interface IMetadataListProps {
    metrics?: IMetadataObjectBase[];
}

/**
 * @internal
 */
export const MetadataList: React.FC<IMetadataListProps> = ({ metrics }) => {
    const intl = useIntl();

    if (isEmpty(metrics)) {
        return null;
    }

    return (
        <div className="gd-metadata-list">
            <div className="gd-metadata-list-title">
                {intl.formatMessage({ id: "descriptionPanel.metrics" })}
            </div>
            <div className="gd-metadata-list-content">
                {metrics.map((metric, index) => (
                    <div className="gd-metadata-list-li" key={index}>
                        <span title={metric.title}>{metric.title}</span>
                        {!isEmpty(metric.description) && (
                            <BubbleHoverTrigger className="gd-metadata-list-icon" showDelay={0} hideDelay={0}>
                                <div className="gd-icon-circle-question" />
                                <Bubble
                                    className="bubble-primary"
                                    arrowOffsets={ARROW_OFFSETS}
                                    alignPoints={ALIGN_POINTS}
                                >
                                    {metric.description}
                                </Bubble>
                            </BubbleHoverTrigger>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
