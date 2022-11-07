// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://localhost:7036/"
};

export const apiEndpoints = {
  queries_entityReference: {
    searchAndFilter: "api/Queries_EntityReference/SearchAndFilter",
    kpi: "api/Queries_EntityReference/Kpi"
  },
  queries_customer: {
    get: "api/Queries_Customers/",
    post: "api/Queries_Customers",
    put: "api/Queries_Customers/",
    searchAndFilter: "api/Queries_Customers/SearchAndFilter",
    kpi: "api/Queries_Customers/Kpi"
  },
  queries_property: {
    get: "api/Queries_Property/",
    post: "api/Queries_Property/",
    put: "api/Queries_Property/",
    searchAndFilter: "api/Queries_Property/SearchAndFilter",
    kpi: "api/Queries_Property/Kpi"
  },
  customer: {
    getAll: "api/Customers"
  },
  renting: {
    getRentingsByPropertyId: "api/Rentings/Property/",
    post: "api/Rentings/",
    put: "api/Rentings/",
    delete: "api/Rentings/"
  },
  static_amenetieType: "api/Static_AmenetieType/",
  static_propertyType: "api/Static_PropertyType/",
  static_propertyStatus: "api/Static_PropertyStatus/",
  static_propertyConditionStatus: "api/Static_PropertyConditionStatus/",
  static_propertyTypology: "api/Static_PropertyTypology/",
  static_energyCertificates: "api/Static_PropertyEnergyCertificate/",
  static_documentTypes: "api/Static_DocumentType/",
  static_documentStatus: "api/Static_DocumentStatus/",
  static_rentingActionTypes: "api/Static_RentingActionType/",
  user: {
    authotize: "authorize"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
