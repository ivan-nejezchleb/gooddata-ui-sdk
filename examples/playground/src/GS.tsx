// (C) 2019-2022 GoodData Corporation
// import React from "react";

// import { ColumnChart } from "@gooddata/sdk-ui-charts";
// import {
//     modifyMeasure,
//     newMeasureSort,
//     newAttributeAreaSort,
//     // newAttributeLocator,
//     newAttributeSort
//   } from "@gooddata/sdk-model";
// import * as Md from "./md/gs_full";

// // const measure = modifyMeasure(Md.NrChecks, m => m.title('NrChecks'));
// const measure = modifyMeasure(Md.Probability);

// const measureSort = newMeasureSort(Md.Probability, 'desc');
// // const attributeSortSum = newAttributeAreaSort(Md.LocationCity, 'desc');
// // const attributeSortSum2 = newAttributeAreaSort(Md.MenuCategory, 'asc');
// // const attributeSortSum3 = newAttributeAreaSort(Md.RestaurantCategory, 'asc');
// const attributeSort = newAttributeSort(Md.StageName.Default, 'asc');
// const attributeSort2 = newAttributeSort(Md.StageName.Default, 'desc');
// // const attributeSort2 = newAttributeSort(Md.MenuCategory, 'asc');

// export const GS: React.FC = () => {
//     return (
//         <>
//             Without sort
//             <div style={{ height: 250 }}>
//                 <ColumnChart
//                     measures={[measure]}
//                     viewBy={[Md.StageName.Default]}
//                 />
//             </div>
//             With explicit sort by default label A-Z
//             <div style={{ height: 250 }}>
//                 <ColumnChart
//                     measures={[measure]}
//                     viewBy={[Md.StageName.Default]}
//                     sortBy={[attributeSort]}
//                 />
//             </div>
//             With explicit inverted default sort
//             <div style={{ height: 250 }}>
//                 <ColumnChart
//                     measures={[measure]}
//                     viewBy={[Md.StageName.Default]}
//                     sortBy={[attributeSort2]}
//                 />
//             </div>
//             Sort by metric
//             <div style={{ height: 250 }}>
//                 <ColumnChart
//                     measures={[measure]}
//                     viewBy={[Md.StageName.Default]}
//                     sortBy={[measureSort]}
//                 />
//             </div>
//         </>
//     );
// };
