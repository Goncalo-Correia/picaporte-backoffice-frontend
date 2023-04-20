import { SearchAndFilterStructure } from "../search-and-filter.structure";

export class PropertyDashboardSearchAndFilterStructure {
    searchAndFilter: SearchAndFilterStructure = new SearchAndFilterStructure();
    propertyTypeId: number = 0;
    propertyStatusId: number = 0;
    propertyLocationTypeId: number = 0;
    propertyTypologyId: number = 0;
    propertyConditionStatusId: number = 0;
    amenetieTypeIds: Array<number> = new Array<number>();
}