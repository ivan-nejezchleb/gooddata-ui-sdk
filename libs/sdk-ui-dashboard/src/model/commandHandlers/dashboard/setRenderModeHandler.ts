// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { put, select } from "redux-saga/effects";

import { DashboardContext } from "../../types/commonTypes";
import { ChangeRenderMode } from "../../commands";
import { RenderModeChanged } from "../../events";
import { renderModeChanged } from "../../events/dashboard";
import { selectDashboardRef } from "../../store/meta/metaSelectors";
import { renderModeActions } from "../../store/renderMode";

export function* setRenderModeHandler(
    ctx: DashboardContext,
    cmd: ChangeRenderMode,
): SagaIterator<RenderModeChanged> {
    const dashboardRef = yield select(selectDashboardRef);
    yield put(renderModeActions.setRenderMode(cmd.payload.newRenderMode));
    return renderModeChanged(ctx, dashboardRef, cmd.payload.newRenderMode, cmd.correlationId);
}
