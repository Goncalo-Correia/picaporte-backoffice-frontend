import { Static_RentingActionType } from "./static/static-rentingActionType.model";
import { Customer } from "./customer.model";
import { User } from "./user.model";
import { Property } from "./property.model";

export class Renting {
    constructor(
        public id?: number,
        public rentingActionTypeId?: number,
        public customerId?: number,
        public propertyId?: number,
        public title?: string,
        public comment?: string,
        public createdBy?: string,
        public createdOn?: Date,
        public lastModifiedBy?: string,
        public lastModifiedOn?: Date,

        public rentingActionType?: Static_RentingActionType,
        public customer?: Customer,
        public property?: Property,
        public createdByUser?: User,
        public lastModifiedByUser?: User
    ) {};
}