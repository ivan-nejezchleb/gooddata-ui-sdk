// (C) 2019-2022 GoodData Corporation
import React from "react";

import { ColumnChart } from "@gooddata/sdk-ui-charts";

import {
    modifyMeasure,
    newMeasureSort,
    newAttributeAreaSort,
    // newAttributeLocator,
    // newAttributeSort,
} from "@gooddata/sdk-model";
import * as Md from "./md/sponky_full";

// const measure = modifyMeasure(Md.NrChecks, m => m.title('NrChecks'));
const measure = modifyMeasure(Md.PocetKoupenych.Sum, (m) =>
    m.title("Sum PocetKoupenych").alias("Sum PocetKoupenych").format("#,##0.00"),
);
const measure2 = modifyMeasure(Md.PocetRozdanych.Sum, (m) =>
    m.title("Sum PocetRozdanych").alias("Sum PocetRozdanych").format("#,##0.00"),
);

const attributeSortSum = newAttributeAreaSort(Md.Type.Default, "asc");
const attributeSortSum2 = newAttributeAreaSort(Md.Polozka.Default, "desc");
const measureSort = newMeasureSort(Md.PocetKoupenych.Sum, "desc");
const measureSort2 = newMeasureSort(Md.PocetRozdanych.Sum, "desc");

// const attributeSortSum2 = newAttributeAreaSort(Md.MenuCategory, 'asc');
// const attributeSortSum3 = newAttributeAreaSort(Md.RestaurantCategory, 'asc');
// const attributeSort = newAttributeSort(Md.Type.Default, 'asc');
// const attributeSort2 = newAttributeSort(Md.Polozka.Default, 'desc');
// const attributeSort2 = newAttributeSort(Md.MenuCategory, 'asc');

export const Sponky: React.FC = () => {
    return (
        <>
            Without sort
            <div style={{ height: 250 }}>
                <ColumnChart measures={[measure, measure2]} viewBy={[Md.Type.Default, Md.Polozka.Default]} />
            </div>
            sorted by SUM, sorted by SUM
            <div style={{ height: 250 }}>
                <ColumnChart
                    measures={[measure, measure2]}
                    viewBy={[Md.Type.Default, Md.Polozka.Default]}
                    sortBy={[attributeSortSum, attributeSortSum2]}
                />
            </div>
            sorted by SUM, sorted by M1
            <div style={{ height: 250 }}>
                <ColumnChart
                    measures={[measure, measure2]}
                    viewBy={[Md.Type.Default, Md.Polozka.Default]}
                    sortBy={[attributeSortSum, measureSort]}
                />
            </div>
            sorted by SUM, sorted by M2
            <div style={{ height: 250 }}>
                <ColumnChart
                    measures={[measure, measure2]}
                    viewBy={[Md.Type.Default, Md.Polozka.Default]}
                    sortBy={[attributeSortSum, measureSort2]}
                />
            </div>
        </>
    );
};
