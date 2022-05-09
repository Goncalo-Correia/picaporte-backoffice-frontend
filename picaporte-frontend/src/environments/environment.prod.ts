export const environment = {
  production: true,
  apiUrl: "http://109.106.244.205:5024/"
};

export const apiEndpoints = {
  queries_entityReference: {
    searchAndFilter: "api/Queries_EntityReference/SearchAndFilter"
  },
  queries_customer: {
    get: "api/Queries_Customers/",
    post: "api/Queries_Customers/",
    put: "api/Queries_Customers/",
    searchAndFilter: "api/Queries_Customers/SearchAndFilter"
  },
  queries_property: {
    get: "api/Queries_Property/",
    post: "api/Queries_Property/",
    put: "api/Queries_Property/",
    searchAndFilter: "api/Queries_Property/SearchAndFilter"
  },
  static_amenetieType: {
    getAll: "api/StaticAmenetieType"
  },
  static_propertyType: {
    getAll: "api/StaticPropertyType"
  },
  static_propertyStatus: {
    getAll: "api/StaticPropertyStatus"
  },
  static_propertyTypology: {
    getAll: "api/StaticPropertyTypology"
  }
};
