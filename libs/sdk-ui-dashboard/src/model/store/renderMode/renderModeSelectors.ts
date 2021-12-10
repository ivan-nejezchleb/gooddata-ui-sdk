// (C) 2021 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { DashboardState } from "../types";

const selectSelf = createSelector(
    (state: DashboardState) => state,
    (state) => state.renderMode,
);

/**
 * This selector returns current dashboard render mode
 *
 * @alpha
 */
export const selectRenderMode = createSelector(selectSelf, (renderModeState) => {
    return renderModeState.mode;
});
