// (C) 2007-2019 GoodData Corporation
import React from "react";
import { PivotTable } from "@gooddata/sdk-ui";
import { newMeasure, newAttribute, newAttributeSort, newAbsoluteDateFilter } from "@gooddata/sdk-model";

import { ExampleWithExport } from "./ExampleWithExport";

import {
    dateDatasetIdentifier,
    projectId,
    quarterDateIdentifier,
    monthDateIdentifier,
    locationStateDisplayFormIdentifier,
    locationNameDisplayFormIdentifier,
    franchiseFeesIdentifier,
    franchiseFeesAdRoyaltyIdentifier,
    franchiseFeesInitialFranchiseFeeIdentifier,
    franchiseFeesIdentifierOngoingRoyalty,
    menuCategoryAttributeDFIdentifier,
} from "../../constants/fixtures";
import { useBackend } from "../../context/auth";

const measures = [
    newMeasure(franchiseFeesIdentifier, m => m.format("#,##0")),
    newMeasure(franchiseFeesAdRoyaltyIdentifier, m => m.format("#,##0")),
    newMeasure(franchiseFeesInitialFranchiseFeeIdentifier, m => m.format("#,##0")),
    newMeasure(franchiseFeesIdentifierOngoingRoyalty, m => m.format("#,##0")),
];

const attributes = [
    newAttribute(locationStateDisplayFormIdentifier),
    newAttribute(locationNameDisplayFormIdentifier),
    newAttribute(menuCategoryAttributeDFIdentifier, a => a.localId("menu")),
];

const columns = [newAttribute(quarterDateIdentifier), newAttribute(monthDateIdentifier)];

const sortBy = [newAttributeSort("menu", "asc")];

const filters = [newAbsoluteDateFilter(dateDatasetIdentifier, "2017-01-01", "2017-12-31")];

const style = { height: 300 };

export const PivotTableExportExample: React.FC = () => {
    const backend = useBackend();

    return (
        <ExampleWithExport filters={filters}>
            {onExportReady => (
                <div style={style} className="s-pivot-table-sorting">
                    <PivotTable
                        backend={backend}
                        workspace={projectId}
                        measures={measures}
                        rows={attributes}
                        columns={columns}
                        pageSize={20}
                        sortBy={sortBy}
                        filters={filters}
                        onExportReady={onExportReady}
                    />
                </div>
            )}
        </ExampleWithExport>
    );
};
