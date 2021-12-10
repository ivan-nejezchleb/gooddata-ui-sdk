// (C) 2019-2021 GoodData Corporation
import React from "react";
import { BackendProvider, ErrorComponent, WorkspaceProvider } from "@gooddata/sdk-ui";
import bearFactory, {
    AnonymousAuthProvider,
    FixedLoginAndPasswordAuthProvider,
} from "@gooddata/sdk-backend-bear";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";
import { ThemedLoadingEqualizer } from "@gooddata/sdk-ui-dashboard/dist/presentation/presentationComponents";

function hasCredentialsSetup(): boolean {
    return BUILD_TYPE === "public" || (process.env.GDC_USERNAME && process.env.GDC_PASSWORD);
}

function createBackend() {
    const backend = bearFactory();

    if (BUILD_TYPE === "public") {
        return backend.withAuthentication(new AnonymousAuthProvider());
    }

    return backend.withAuthentication(
        new FixedLoginAndPasswordAuthProvider(process.env.GDC_USERNAME!, process.env.GDC_PASSWORD!),
    );
}

export const App: React.FC = () => {
    if (!hasCredentialsSetup()) {
        return (
            <p>
                Your playground is not setup with credentials. Check out the README.md for more. TL;DR: point
                the playground against the public access proxy or set GDC_USERNAME and GDC_PASSWORD in the
                .env file.
            </p>
        );
    }

    const backend = createBackend();

    const {
        status: dashboardStatus,
        result: dashboardResult,
        error: dashboardError,
    } = useDashboardLoader({
        backend: backend,
        dashboard: "aaclpVqd3mPZ",
        workspace: "mbuumy476p78ybcceiru61hcyr8i8lo8",
        loadingMode: "staticOnly",
    });

    const isDashboardLoading = dashboardStatus === "loading" || dashboardStatus === "pending";

    if (isDashboardLoading) {
        return <ThemedLoadingEqualizer />;
    }

    const DashboardComponent = dashboardResult?.DashboardComponent;

    if (dashboardError || !DashboardComponent) {
        return <ErrorComponent message={dashboardError.message || "DashboardComponent is empty."} />;
    }

    return (
        <BackendProvider backend={backend}>
            <WorkspaceProvider workspace={WORKSPACE}>
                <DashboardComponent />
                {/* Build your playground components under the playground directory.*/}
            </WorkspaceProvider>
        </BackendProvider>
    );
};
