// (C) 2021 GoodData Corporation
import { createSlice } from "@reduxjs/toolkit";
import { renderModeReducers } from "./renderModeReducers";
import { renderModeInitialState } from "./renderModeState";

const renderModeSlice = createSlice({
    name: "renderMode",
    initialState: renderModeInitialState,
    reducers: renderModeReducers,
});

export const renderModeSliceReducer = renderModeSlice.reducer;
export const renderModeActions = renderModeSlice.actions;
