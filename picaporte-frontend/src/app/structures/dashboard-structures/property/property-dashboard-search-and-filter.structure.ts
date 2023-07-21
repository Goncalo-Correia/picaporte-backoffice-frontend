import { SearchAndFilterStructure } from "../search-and-filter.structure";

export class PropertyDashboardSearchAndFilterStructure {
    searchAndFilter: SearchAndFilterStructure = new SearchAndFilterStructure();
    propertyTypeId: number = 0;
    propertyStatusId: number = 0;
    propertyLocationTypeId: number = 0;
    propertyTypologyId: number = 0;
    propertyConditionStatusId: number = 0;
    islandId: number = 0;
    isOnline: boolean = false;
    amenetieTypeIds: Array<number> = new Array<number>();
}