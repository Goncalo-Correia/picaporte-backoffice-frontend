// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://localhost:7036/"
};

export const apiEndpoints = {
  queries_entityReference: {
    searchAndFilter: "api/Queries_EntityReference/SearchAndFilter"
  },
  queries_customer: {
    get: "api/Queries_Customers/",
    post: "api/Queries_Customers",
    put: "api/Queries_Customers/",
    searchAndFilter: "api/Queries_Customers/SearchAndFilter"
  },
  queries_property: {
    get: "api/Queries_Property/",
    post: "api/Queries_Property/",
    put: "api/Queries_Property/",
    searchAndFilter: "api/Queries_Property/SearchAndFilter"
  },
  customer: {
    getAll: "api/Customers"
  },
  static_amenetieType: {
    getAll: "api/Static_AmenetieType"
  },
  static_propertyType: {
    getAll: "api/Static_PropertyType"
  },
  static_propertyStatus: {
    getAll: "api/Static_PropertyStatus"
  },
  static_propertyConditionStatus: {
    getAll: "api/Static_PropertyConditionStatus"
  },
  static_propertyTypology: {
    getAll: "api/Static_PropertyTypology"
  },
  static_energyCertificates: {
    getAll: "api/Static_EnergyCertificate"
  },
  static_documentTypes: {
    getAll: "api/Static_DocumentType"
  },
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
