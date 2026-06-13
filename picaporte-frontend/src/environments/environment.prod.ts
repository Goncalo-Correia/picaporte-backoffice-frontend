import { secrets } from './environment.secrets';

export const environment: {
  production: boolean;
  apiUrl: string;
  apiKey: string;
  mapboxAccessToken: string;
  googleMapsKey: string;
  auth0: { domain: string; clientId: string; audience: string; redirectUri: string };
} = {
  production: true,
  apiUrl: 'https://picaporte-api.onrender.com/',
  ...secrets
};

// apiEndpoints is environment-agnostic — imported by services from environment.ts which is replaced
// by this file in production. Re-exporting from api-endpoints avoids a circular reference.
export const apiEndpoints = {
  queries_entityReference: {
    searchAndFilter: 'api/Queries_EntityReference/SearchAndFilter',
    kpi: 'api/Queries_EntityReference/Kpi',
    delete: 'api/Queries_EntityReference/Delete/'
  },
  queries_customer: {
    get: 'api/Queries_Customers/',
    post: 'api/Queries_Customers',
    put: 'api/Queries_Customers/',
    searchAndFilter: 'api/Queries_Customers/SearchAndFilter',
    kpi: 'api/Queries_Customers/Kpi'
  },
  queries_user: {
    get: 'api/Queries_Users/',
    post: 'api/Queries_Users',
    put: 'api/Queries_Users/',
    searchAndFilter: 'api/Queries_Users/SearchAndFilter',
    kpi: 'api/Queries_Users/Kpi'
  },
  queries_export: {
    exportUser: 'api/Queries_Export/ExportUser',
    exportCustomer: 'api/Queries_Export/ExportCustomer',
    exportProperty: 'api/Queries_Export/ExportProperty'
  },
  queries_task: {
    getByRecordId: 'api/Queries_Task/Tasks/',
    allocate: 'api/Queries_Task/Allocate/',
    update: 'api/Queries_Task/Update',
    searchAndFilter: 'api/Queries_Task/SearchAndFilter',
    kpi: 'api/Queries_Task/Kpi'
  },
  queries_property: {
    get: 'api/Queries_Property/',
    post: 'api/Queries_Property/',
    put: 'api/Queries_Property/',
    searchAndFilter: 'api/Queries_Property/SearchAndFilter',
    kpi: 'api/Queries_Property/Kpi'
  },
  customer: {
    getAll: 'api/Customers'
  },
  renting: {
    getRentingsByPropertyId: 'api/Rentings/Property/',
    post: 'api/Rentings/',
    put: 'api/Rentings/',
    delete: 'api/Rentings/'
  },
  news: {
    get: 'api/News',
    post: 'api/News',
    approve: 'api/News/Approve/',
    put: 'api/News/',
    delete: 'api/News/'
  },
  toDos: {
    get: 'api/ToDo',
    post: 'api/ToDo',
    delete: 'api/ToDo/',
    postItem: 'api/ToDo/ToDoItem',
    deleteItem: 'api/ToDo/ToDoItem/'
  },
  image: {
    get: 'api/Images/',
    binary: 'api/Images/Binary/',
    renting: 'api/Images/Binary/Renting/'
  },
  document: {
    requestDocument: 'api/Documents/RequestDocument/'
  },
  activityLog: {
    get: 'api/ActivityLogs/EntityReference/'
  },
  static_amenetieType: {
    get: 'api/Static_AmenetieType/isActive/',
    updateAll: 'api/Static_AmenetieType/updateAll',
    base: 'api/Static_AmenetieType/'
  },
  static_island: {
    get: 'api/Static_Island/'
  },
  static_propertyLocationType: {
    get: 'api/Static_PropertyLocationType/isActive/',
    updateAll: 'api/Static_PropertyLocationType/updateAll',
    base: 'api/Static_PropertyLocationType/'
  },
  static_propertyType: {
    get: 'api/Static_PropertyType/isActive/',
    updateAll: 'api/Static_PropertyType/updateAll',
    base: 'api/Static_PropertyType/'
  },
  static_propertyStatus: {
    get: 'api/Static_PropertyStatus/isActive/',
    updateAll: 'api/Static_PropertyStatus/updateAll',
    base: 'api/Static_PropertyStatus/'
  },
  static_propertyConditionStatus: {
    get: 'api/Static_PropertyConditionStatus/isActive/',
    updateAll: 'api/Static_PropertyConditionStatus/updateAll',
    base: 'api/Static_PropertyConditionStatus/'
  },
  static_propertyTypology: {
    get: 'api/Static_PropertyTypology/isActive/',
    updateAll: 'api/Static_PropertyTypology/updateAll',
    base: 'api/Static_PropertyTypology/'
  },
  static_energyCertificates: {
    get: 'api/Static_PropertyEnergyCertificate/isActive/',
    updateAll: 'api/Static_PropertyEnergyCertificate/updateAll',
    base: 'api/Static_PropertyEnergyCertificate/'
  },
  static_documentTypes: {
    get: 'api/Static_DocumentType/isActive/',
    updateAll: 'api/Static_DocumentType/updateAll',
    base: 'api/Static_DocumentType/'
  },
  static_documentStatus: {
    get: 'api/Static_DocumentStatus/isActive/',
    updateAll: 'api/Static_DocumentStatus/updateAll',
    base: 'api/Static_DocumentStatus/'
  },
  static_rentingActionTypes: {
    get: 'api/Static_RentingActionType/isActive/',
    updateAll: 'api/Static_RentingActionType/updateAll',
    base: 'api/Static_RentingActionType/'
  },
  notification: {
    newsletter: 'api/Notification/Newsletter'
  }
};
