// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { put, select, call } from "redux-saga/effects";

import { DashboardContext, PrivateDashboardContext } from "../../types/commonTypes";
import { ChangeRenderMode } from "../../commands";
import { RenderModeChanged } from "../../events";
import { renderModeChanged } from "../../events/dashboard";
import { selectDashboardRef } from "../../store/meta/metaSelectors";
import { renderModeActions } from "../../store/renderMode";
import { getPrivateContext } from "../../store/_infra/contexts";
import { internalErrorOccurred } from "../../events/general";
import { selectRenderMode } from "../../store/renderMode/renderModeSelectors";

export function* setRenderModeHandler(
    ctx: DashboardContext,
    cmd: ChangeRenderMode,
): SagaIterator<RenderModeChanged> {
    const dashboardRef = yield select(selectDashboardRef);
    const privateCtx: PrivateDashboardContext = yield call(getPrivateContext);
    const checkFn = privateCtx?.checkRenderModeSwitch;
    let canSwitch = true;
    if (checkFn) {
        const currentMode = yield select(selectRenderMode);
        canSwitch = yield call(checkFn, currentMode, cmd.payload.newRenderMode);
    }
    if (canSwitch === true) {
        yield put(renderModeActions.setRenderMode(cmd.payload.newRenderMode));
        return renderModeChanged(ctx, dashboardRef, cmd.payload.newRenderMode, cmd.correlationId);
    }
    throw internalErrorOccurred(ctx, cmd, canSwitch || "Nepovedlo se");
}
