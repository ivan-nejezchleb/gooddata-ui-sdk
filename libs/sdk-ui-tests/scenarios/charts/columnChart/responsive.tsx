// (C) 2007-2019 GoodData Corporation
import { ColumnChart } from "@gooddata/sdk-ui-charts";
import { ColumnChartWithArithmeticMeasuresAndViewBy } from "./base";
import { ScenarioGroupNames } from "../_infra/groupNames";
import { responsiveScenarios } from "../_infra/responsiveScenarious";
import { IResponsiveSize } from "../_infra/responsiveScenarious";
import { ReferenceLdm } from "@gooddata/reference-workspace";

const sizeVariantsSimple: Array<IResponsiveSize> = [
    { label: "without y axis title", width: 120, height: 354 },
    { label: "without y axis labels, with y axis title", width: 60, height: 354 },
];

const simpleScenarios = responsiveScenarios(
    "ColumnChart",
    ScenarioGroupNames.Responsive,
    ColumnChart,
    {
        measures: [ReferenceLdm.Amount],
        viewBy: [ReferenceLdm.Product.Name],
        config: { enableCompactSize: true, legend: { enabled: false } },
    },
    sizeVariantsSimple,
);

const sizeVariantsComplex: Array<IResponsiveSize> = [
    { label: "without x axis, without y axis (very small container)", width: 40, height: 60 },
    { label: "without x axis labels", width: 650, height: 90 },
    { label: "without x axis title", width: 650, height: 120 },
    { label: "without y axis labels", width: 60, height: 354 },
];

const complexCcenarios = responsiveScenarios(
    "ColumnChart",
    ScenarioGroupNames.Responsive,
    ColumnChart,
    {
        ...ColumnChartWithArithmeticMeasuresAndViewBy,
        config: { enableCompactSize: true, legend: { enabled: false } },
    },
    sizeVariantsComplex,
);

export default [...complexCcenarios, ...simpleScenarios];