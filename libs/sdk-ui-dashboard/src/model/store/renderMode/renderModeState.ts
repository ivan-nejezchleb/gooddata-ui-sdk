// (C) 2021 GoodData Corporation

import { RenderMode } from "../../types/commonTypes";

/**
 * @alpha
 */
export interface RenderModeState {
    mode: RenderMode;
}

export const renderModeInitialState: RenderModeState = { mode: "view" };
