import { Static_RentingActionType } from "./static/static-rentingActionType.model";
import { Customer } from "./customer.model";
import { User } from "./user.model";
import { Property } from "./property.model";

export class Renting {
    public id: number = 0;
    public staticRentingActionTypeId: number = 0;
    public customerId: number = 0;
    public propertyId: number = 0;
    public title: string = "";
    public comment: string = "";
    public filename: string = "";
    public createdById: number = 0;
    public createdOn: Date = new Date();
    public lastModifiedById: number = 0;
    public lastModifiedOn: Date = new Date();

    public staticRentingActionType: Static_RentingActionType = new Static_RentingActionType();
    public customer: Customer = new Customer();
    public property: Property = new Property();
    public createdBy: User = new User();
    public lastModifiedBy: User = new User();

    public content: string = "";
}