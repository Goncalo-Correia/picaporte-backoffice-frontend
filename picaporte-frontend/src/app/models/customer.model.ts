import { Address } from "./address.model";
import { Preference } from "./preference.model";
import { User } from "./user.model";
import { Property } from "./property.model";

export class Customer {
    public id: number = 0;
    public firstName: string = "";
    public lastName: string = "";
    public phoneNumber: string = "";
    public email: string = "";
    public cc: string = "";
    public nif: string = "";

    public addressId: number = 0;
    public userId: number = 0;
    public entityReferenceId: number = 0;

    public address: Address = new Address();
    public user: User = new User();
    public preferences: Array<Preference> = new Array<Preference>();
    public properties: Array<Property> = new Array<Property>();
}