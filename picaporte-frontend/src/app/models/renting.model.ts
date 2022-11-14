import { Static_RentingActionType } from "./static/static-rentingActionType.model";
import { Customer } from "./customer.model";
import { User } from "./user.model";
import { Property } from "./property.model";

export class Renting {
    public id: number = 0;
    public rentingActionTypeId: number = 0;
    public customerId: number = 0;
    public propertyId: number = 0;
    public title: string = "";
    public comment: string = "";
    public createdBy: string = "";
    public createdOn: Date = new Date();
    public lastModifiedBy: string = "";
    public lastModifiedOn: Date = new Date();

    public rentingActionType: Static_RentingActionType = new Static_RentingActionType();
    public customer: Customer = new Customer();
    public property: Property = new Property();
    public createdByUser: User = new User();
    public lastModifiedByUser: User = new User();
}