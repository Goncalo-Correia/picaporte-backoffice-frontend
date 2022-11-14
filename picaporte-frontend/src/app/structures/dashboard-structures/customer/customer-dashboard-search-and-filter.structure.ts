import { SearchAndFilterStructure } from "../search-and-filter.structure";

export class CustomerDashboardSearchAndFilterStructure {
    searchAndFilterStructure: SearchAndFilterStructure = new SearchAndFilterStructure();
    amenetieTypeId: number | undefined;
    customersWithUser: boolean = false;
}