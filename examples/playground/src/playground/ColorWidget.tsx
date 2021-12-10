// (C) 2021 GoodData Corporation

import React from "react";

const ColorWidget: React.FC<{ type: "edit" | "view" }> = ({ type }) => {
    return (
        <div
            style={{
                width: "100%",
                background: type === "edit" ? "red" : "green",
                color: "white",
                textAlign: "center",
                padding: "20px",
            }}
        >
            {type === "edit" ? "This is edit mode!" : "This is view mode!"}
        </div>
    );
};

export const ColorWidgetEdit = () => <ColorWidget type="edit" />;
export const ColorWidgetView = () => <ColorWidget type="view" />;
