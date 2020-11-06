// (C) 2020 GoodData Corporation

import { ITheme } from "@gooddata/sdk-backend-spi";

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
};

const generateTheme = (identifier: string, title: string): ITheme => {
    return {
        identifier,
        title,
        updated: "2020-11-05 18:56:33",
        analyticalDesigner: {
            title: {
                color: generateColor(),
            },
        },
        button: {
            borderRadius: "10",
            dropShadow: true,
            textCapitalization: true,
        },
        dashboards: {
            content: {
                backgroundColor: generateColor(),
                kpiWidget: {
                    borderColor: generateColor(),
                    backgroundColor: generateColor(),
                    borderRadius: "4",
                    borderWidth: "4",
                    dropShadow: false,
                    kpi: {
                        primaryMeasureColor: generateColor(),
                        secondaryInfoColor: generateColor(),
                        value: {
                            negativeColor: generateColor(),
                            positiveColor: generateColor(),
                            textAlign: "right",
                        },
                    },
                    title: {
                        color: generateColor(),
                        textAlign: "right",
                    },
                },
                widget: {
                    borderColor: generateColor(),
                    borderRadius: "4",
                    borderWidth: "1",
                    dropShadow: false,
                    title: {
                        color: generateColor(),
                        textAlign: "left",
                    },
                },
            },
            editPanel: {
                backgroundColor: generateColor(),
            },
            filterBar: {
                backgroundColor: generateColor(),
                filterButton: {
                    backgroundColor: generateColor(),
                },
            },
            navigation: {
                backgroundColor: generateColor(),
                borderColor: generateColor(),
                item: {
                    color: generateColor(),
                    hoverColor: generateColor(),
                    selectedBackgroundColor: generateColor(),
                    selectedColor: generateColor(),
                },
                title: {
                    color: generateColor(),
                },
            },
            section: {
                description: {
                    color: generateColor(),
                },
                title: {
                    color: generateColor(),
                    lineColor: generateColor(),
                },
            },
            title: {
                color: generateColor(),
            },
        },
        modal: {
            borderColor: generateColor(),
            borderRadius: "50px",
            borderWidth: "15",
            dropShadow: false,
            outsideBackgroundColor: generateColor(),
            title: {
                color: generateColor(),
                lineColor: generateColor(),
            },
        },
        palette: {
            error: {
                base: "#ff2e5f",
                contrast: "#fff",
                dark: "#ff2e5f",
                light: "#ff2e5f",
            },
            primary: {
                base: generateColor(),
            },
            success: {
                base: "#13ed4d",
                contrast: "#fff",
                dark: "#13ed4d",
                light: "#13ed4d",
            },
            warning: {
                base: "#ddff19",
                contrast: "#000",
                dark: "#ddff19",
                light: "#ddff19",
            },
        },
        tooltip: {
            backgroundColor: generateColor(),
            color: generateColor(),
        },
        typography: {
            font:
                "url(https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf)",
            fontBold:
                "url(https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf)",
        },
    };
};

export const themes = [
    generateTheme("01", "My custom theme 01"),
    generateTheme("02", "My custom theme 02"),
    generateTheme("03", "My custom theme 03"),
];
