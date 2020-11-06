// (C) 2020 GoodData Corporation
import { ThemesList } from "@gooddata/sdk-ui-kit";
import React from "react";
import { storiesOf } from "@storybook/react";
import { UiKit } from "../../../_infra/storyGroups";
import { ReferenceWorkspaceId, StorybookBackend } from "../../../_infra/backend";
import { themes } from "./customThemes";

import "@gooddata/sdk-ui-kit/styles/css/main.css";

const backend = StorybookBackend({
    themes,
});

const ThemesListTest: React.FC = () => {
    return (
        <div className="library-component screenshot-target gd-datepicker">
            <ThemesList backend={backend} workspace={ReferenceWorkspaceId} />
        </div>
    );
};

storiesOf(`${UiKit}/ThemesList`, module).add("full-featured", () => {
    return <ThemesListTest />;
});
