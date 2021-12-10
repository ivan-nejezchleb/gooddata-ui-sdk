// (C) 2021 GoodData Corporation
import React, { PropsWithChildren } from "react";

import { IButtonBarProps } from "./types";
import { DefaultShareButton } from "../shareButton";
import { Button } from "@gooddata/sdk-ui-kit";
import {
    changeRenderMode,
    selectRenderMode,
    useDashboardDispatch,
    useDashboardSelector,
} from "../../../model";

/**
 * @alpha
 */
export const DefaultButtonBar: React.FC<PropsWithChildren<IButtonBarProps>> = (props): JSX.Element => {
    const { children, shareButtonProps } = props;

    const dispatch = useDashboardDispatch();
    const renderMode = useDashboardSelector(selectRenderMode);

    const isEditMode = renderMode === "edit";

    console.log("isEditMode", isEditMode);

    const onEditClick = () => {
        dispatch(changeRenderMode(isEditMode ? "view" : "edit"));
    };

    // TODO INE allow customization of buttons via getter from props
    return (
        <div className="dash-control-buttons">
            {children}
            <Button
                onClick={onEditClick}
                value={isEditMode ? "Cancel" : "Edit"}
                className="unicorn-button gd-button-secondary dash-header-share-button s-header-share-button gd-button gd-icon-pencil"
            />
            <DefaultShareButton {...shareButtonProps} />
        </div>
    );
};
