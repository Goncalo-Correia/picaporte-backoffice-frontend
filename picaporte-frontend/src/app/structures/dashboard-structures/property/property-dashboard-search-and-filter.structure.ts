import { SearchAndFilterStructure } from "../search-and-filter.structure";

export class PropertyDashboardSearchAndFilterStructure {
    searchAndFilterStructure: SearchAndFilterStructure = new SearchAndFilterStructure();
    propertyTypeId: number = 0;
    propertyStatusId: number | undefined;
    propertyTypologyId: number | undefined;
    propertyConditionStatusId: number | undefined;
    amenetieTypeId: number | undefined;
}