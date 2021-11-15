// (C) 2020 GoodData Corporation
import React from "react";
import { useShareDialogProps } from "./ShareDialogPropsContext";
import { ShareDialog } from "@gooddata/sdk-ui-kit";

/**
 * @internal
 */
export const DefaultShareDialogInner = (): JSX.Element | null => {
    const { workspace, backend, isVisible, sharedObject, currentUserRef, onApply, onCancel } =
        useShareDialogProps();

    if (!isVisible) {
        return null;
    }

    return (
        <ShareDialog
            backend={backend}
            workspace={workspace}
            sharedObject={sharedObject}
            currentUserRef={currentUserRef}
            onApply={onApply}
            onCancel={onCancel}
        />
    );
};
