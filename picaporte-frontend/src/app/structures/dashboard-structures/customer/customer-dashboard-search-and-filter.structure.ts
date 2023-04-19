import { SearchAndFilterStructure } from "../search-and-filter.structure";

export class CustomerDashboardSearchAndFilterStructure {
    searchAndFilterStructure: SearchAndFilterStructure = new SearchAndFilterStructure();
    amenetieTypeIds: Array<number> = new Array<number>();
    customersWithUser: boolean = false;
}