// (C) 2020 GoodData Corporation
import { ITheme } from "@gooddata/sdk-backend-spi";

export const customTheme: ITheme = {
    button: {
        borderRadius: "2",
        dropShadow: true,
    },
    modal: {
        borderColor: "#FFF",
        borderRadius: "6",
        borderWidth: "2",
        dropShadow: true,
        outsideBackgroundColor: "#DAE2EA",
        title: {
            color: "#6D7680",
            lineColor: "#DAE2EA",
        },
    },
    palette: {
        error: {
            base: "#e54d42",
        },
        primary: {
            base: "#3049D1",
        },
        success: {
            base: "#00c18d",
        },
        warning: {
            base: "#f4d521",
        },
    },
    tooltip: {
        backgroundColor: "#07124E",
        color: "#C8D0FF",
    },
    typography: {
        font: "url(https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf)",
        fontBold: "url(https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf)",
    },
};
