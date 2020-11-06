// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { ITheme } from "@gooddata/sdk-backend-spi";
import { Bubble, BubbleHoverTrigger } from "../Bubble";

export interface IThemesPreviewProps {
    theme: ITheme;
}

export const DashFilter: React.FC<IThemesPreviewProps> = ({ theme }) => {
    return (
        <div
            className="preview-dash-filter"
            style={{
                backgroundColor: theme?.dashboards?.filterBar?.filterButton?.backgroundColor,
            }}
        />
    );
};

export const DashKpi: React.FC<IThemesPreviewProps> = ({ theme }) => {
    return (
        <div
            className="preview-dash-kpi"
            style={{
                backgroundColor: theme?.dashboards?.content?.kpiWidget?.backgroundColor,
            }}
        />
    );
};

export const DashWidget: React.FC<IThemesPreviewProps> = ({ theme }) => {
    return (
        <div
            className="preview-dash-widget"
            style={{
                borderColor: theme?.dashboards?.content?.widget?.borderColor,
            }}
        />
    );
};

export interface IThemesListItemProps {
    title: string;
    theme: ITheme;
    isSelected?: boolean;
    isLoading?: boolean;
    onClick: (theme: ITheme) => void;
}

export const ThemesListItem: React.FC<IThemesListItemProps> = ({
    title,
    theme,
    isLoading,
    isSelected,
    onClick,
}) => {
    if (isLoading) {
        return (
            <div className="gd-list-item gd-project-list-item gd-is-loading">
                <div className="gd-spinner small" />
            </div>
        );
    }

    const classes = cx({
        "gd-list-item": true,
        "gd-themes-list-item": true,
        [`s-${stringUtils.simplifyText(title)}`]: true,
        "gd-is-selected": isSelected,
    });
    return (
        <div className={classes} onClick={() => onClick(theme)}>
            <div className="theme-info">
                <BubbleHoverTrigger showDelay={0} hideDelay={0}>
                    <div className="theme-title">{title}</div>
                    <Bubble
                        className={`bubble-primary gd-attribute-filter-dropdown-bubble s-attribute-filter-dropdown-bubble`}
                        alignPoints={[{ align: "bc tc" }]}
                        arrowOffsets={{ "bc tc": [0, 15] }}
                    >
                        {theme.updated && <div className="theme-date">Last updated: {theme.updated}</div>}
                    </Bubble>
                </BubbleHoverTrigger>
            </div>
            <div className="theme-preview">
                <div className="preview-dash-content gd-flex-container">
                    <div
                        className="gd-flex-item preview-dash-nav"
                        style={{
                            backgroundColor: theme?.dashboards?.navigation?.backgroundColor,
                        }}
                    >
                        <div
                            className="preview-dash-nav-selected"
                            style={{
                                backgroundColor: theme?.dashboards?.navigation?.item?.selectedBackgroundColor,
                            }}
                        ></div>
                    </div>
                    <div className="preview-maincontent">
                        <div
                            className="preview-dash-header"
                            style={{
                                backgroundColor: theme?.palette?.primary?.base,
                            }}
                        ></div>
                        <div
                            className="preview-dash-filters-wrapper"
                            style={{
                                backgroundColor: theme?.dashboards?.filterBar?.backgroundColor,
                            }}
                        >
                            <DashFilter theme={theme} />
                            <DashFilter theme={theme} />
                        </div>
                        <div
                            className="preview-dash-section"
                            style={{
                                backgroundColor: theme?.dashboards?.content?.backgroundColor,
                            }}
                        >
                            <div className="preview-dash-kpis">
                                <DashKpi theme={theme} />
                                <DashKpi theme={theme} />
                            </div>
                            <div className="preview-dash-widgets">
                                <DashWidget theme={theme} />
                                <DashWidget theme={theme} />
                                <DashWidget theme={theme} />
                                <DashWidget theme={theme} />
                                <DashWidget theme={theme} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
