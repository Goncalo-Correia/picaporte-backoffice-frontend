import { Static_RentingActionType } from "./static/static-rentingActionType.model";
import { Customer } from "./customer.model";
import { User } from "./user.model";

export class Renting {
    public id: string = "";
    public staticRentingActionTypeId: number | null = null;
    public customerId: string | null = null;
    public propertyId: string | null = null;
    public title: string = "";
    public comment: string = "";
    public filename: string = "";
    public mimeType: string = "";
    public createdById: string | null = null;
    public createdOn: Date = new Date();
    public lastModifiedById: string | null = null;
    public lastModifiedOn: Date = new Date();

    public staticRentingActionType: Static_RentingActionType = new Static_RentingActionType();
    public customer: Customer = new Customer();
    public createdBy: User = new User();
    public lastModifiedBy: User = new User();

    public content: string = "";
}