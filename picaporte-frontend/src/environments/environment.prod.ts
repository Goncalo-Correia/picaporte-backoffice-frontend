export const environment = {
  production: true,
  apiUrl: "https://192.168.10.100:5024/",
  apiKey: "REDACTED_API_KEY"
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
  queries_user: {
    get: "api/Queries_Users/",
    post: "api/Queries_Users",
    put: "api/Queries_Users/",
    searchAndFilter: "api/Queries_Users/SearchAndFilter",
    kpi: "api/Queries_Users/Kpi"
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
  news: {
    get: "api/News",
    post: "api/News",
    put: "api/News/",
    delete: "api/News/"
  },
  toDos: {
    get: "api/ToDo",
    post: "api/ToDo",
    delete: "api/ToDo/"
  },
  activityLog: {
    get: "api/ActivityLog/EntityReference/"
  },
  static_amenetieType: "api/Static_AmenetieType/",
  static_propertyType: "api/Static_PropertyType/",
  static_propertyStatus: "api/Static_PropertyStatus/",
  static_propertyConditionStatus: "api/Static_PropertyConditionStatus/",
  static_propertyTypology: "api/Static_PropertyTypology/",
  static_energyCertificates: "api/Static_PropertyEnergyCertificate/",
  static_documentTypes: "api/Static_DocumentType/",
  static_documentStatus: "api/Static_DocumentStatus/",
  static_rentingActionTypes: "api/Static_RentingActionType",
  user: {
    authotize: "api/Users/authorize"
  }
};