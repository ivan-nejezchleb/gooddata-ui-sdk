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
// import * as Md from "./md/restaurants_full";

// // const measure = modifyMeasure(Md.NrChecks, m => m.title('NrChecks'));
// const measure = modifyMeasure(Md.$MenuItemSales.Sum, m => m.title('Sum MenuItemSales'));

// const measureSort = newMeasureSort(Md.$MenuItemSales.Sum, 'desc');
// const attributeSortSum = newAttributeAreaSort(Md.LocationCity, 'desc');
// const attributeSortSum2 = newAttributeAreaSort(Md.MenuCategory, 'asc');
// const attributeSortSum3 = newAttributeAreaSort(Md.RestaurantCategory, 'asc');
// const attributeSort = newAttributeSort(Md.LocationCity, 'asc');
// const attributeSort2 = newAttributeSort(Md.MenuCategory, 'asc');

// export const Restaurants: React.FC = () => {
//     return (
//         <>
//             <div style={{ height: 300 }}>
//                 <ColumnChart
//                     measures={[measure]}
//                     viewBy={[Md.LocationCity, Md.MenuCategory]}
//                 />
//             </div>
//             <div style={{ height: 300 }}>
//                 <ColumnChart
//                     measures={[
//                         measure
//                     ]}
//                     viewBy={[Md.LocationCity]}
//                     sortBy={[measureSort]}
//                 />
//             </div>
//             <div style={{ height: 300 }}>
//                 <ColumnChart
//                     measures={[
//                         measure
//                     ]}
//                     viewBy={[Md.LocationCity]}
//                     stackBy={Md.MenuCategory}
//                     sortBy={[attributeSortSum]}
//                 />
//             </div>
//             <div style={{ height: 300 }}>
//                 <ColumnChart
//                     measures={[
//                         measure
//                     ]}
//                     viewBy={[Md.LocationCity, Md.MenuCategory]}
//                     sortBy={[attributeSortSum, attributeSortSum2]}
//                 />
//             </div>
//             <div style={{ height: 300 }}>
//                 <ColumnChart
//                     measures={[
//                         modifyMeasure(Md.$FranchiseFees, m => m.title('FranchiseFees')),
//                         modifyMeasure(Md.$TotalCosts, m => m.title('TotalCosts'))
//                     ]}
//                     viewBy={[Md.LocationState, Md.LocationCity]}
//                 />
//             </div>
//             <div style={{ height: 300 }}>
//                 <ColumnChart
//                     measures={[
//                         modifyMeasure(Md.$FranchiseFees, m => m.title('FranchiseFees')),
//                         modifyMeasure(Md.$TotalCosts, m => m.title('TotalCosts'))
//                     ]}
//                     viewBy={[Md.LocationState, Md.LocationCity]}
//                     sortBy={[newAttributeAreaSort(Md.LocationState, 'asc'), newAttributeAreaSort(Md.LocationCity, 'desc')]}
//                 />
//             </div>
//         </>
//     );
// };
