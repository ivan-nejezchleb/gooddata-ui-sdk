// (C) 2021 GoodData Corporation

import { Action, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { RenderMode } from "../../types/commonTypes";
import { RenderModeState } from "./renderModeState";

type RenderModeReducers<A extends Action> = CaseReducer<RenderModeState, A>;

const setRenderMode: RenderModeReducers<PayloadAction<RenderMode>> = (state, action) => {
    state.mode = action.payload;
};

export const renderModeReducers = {
    setRenderMode,
};
