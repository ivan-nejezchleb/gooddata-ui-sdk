import React from "react";
import { DescriptionPanel, DescriptionPanelContent, IDescriptionPanelProps } from "@gooddata/sdk-ui-kit";
import { storiesOf } from "../../../_infra/storyRepository";
import { UiKit } from "../../../_infra/storyGroups";
import { wrapWithTheme } from "../../themeWrapper";

const TITLE = "Revenue and Customer Distribution in the US";
const TITLE_2 = "RevenueandCustomerDistributionintheUSRevenueandCustomerDistributionintheUS";
const DESC =
    "The distribution of income in the United States continues to hold ... Consumer Price Index for All Urban Consumers (CPI-U), and is scaled.";
const LOREM =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis odio ultricies hendrerit varius. Cras id tellus eu leo blandit congue et sit amet lacus. Duis condimentum vestibulum metus, a gravida mi pellentesque ut. Mauris accumsan elementum sem, ut pellentesque purus lacinia at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent efficitur ante fringilla ipsum interdum ullamcorper. Cras gravida vulputate libero sed semper. Pellentesque a justo sollicitudin, pellentesque metus quis, ornare risus. Fusce porta sem nulla, at malesuada enim suscipit nec. Sed fringilla leo et odio convallis ullamcorper. Nullam semper nunc a neque maximus, vitae consectetur lectus fringilla. Suspendisse et faucibus nisl.";
const PROPS_1: IDescriptionPanelProps = {
    title: TITLE_2,
    description: LOREM,
    metrics: [
        {
            title: "# of Active Customers # of Active Customers # of Active Customers # of Active Customers",
            description:
                "Tooltip for # of Active Customers # of Active Customers # of Active Customers # of Active Customers.",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
        {
            title: "# of Active Customers # of Active Customers # of Active Customers # of Active Customers",
            description: "",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
        {
            title: "# of Active Customers",
            description: "Tooltip for # of Active Customers.",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
        {
            title: "# of Active Customers",
            description: "Tooltip for # of Active Customers.",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
        {
            title: "# of Active Customers",
            description: "Tooltip for # of Active Customers.",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
    ],
};
const PROPS_2: IDescriptionPanelProps = {
    title: TITLE,
    description: DESC,
    metrics: [
        {
            title: "Revenue",
            description: "",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
        {
            title: "# of Active Customers",
            description: "Tooltip for # of Active Customers.",
            type: "measure",
            production: true,
            deprecated: false,
            unlisted: false,
        },
    ],
};
const PROPS_3: IDescriptionPanelProps = {
    description: DESC,
};

const DescriptionPanelTest: React.FC = () => {
    return (
        <div className="library-component screenshot-target">
            <h4>Description panel with long body text</h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <DescriptionPanelContent {...PROPS_1} />
                <DescriptionPanel {...PROPS_1} />
            </div>

            <h4>Description panel</h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <DescriptionPanelContent {...PROPS_2} />
                <DescriptionPanel {...PROPS_2} />
            </div>

            <h4>Minimal description panel</h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <DescriptionPanelContent {...PROPS_3} />
                <DescriptionPanel {...PROPS_3} />
            </div>
        </div>
    );
};

storiesOf(`${UiKit}/DescriptionPanel`)
    .add("full-featured", () => <DescriptionPanelTest />, { screenshot: true })
    .add("themed", () => wrapWithTheme(<DescriptionPanelTest />), { screenshot: true });
