import { Address } from "./address.model";
import { User } from "./user.model";

export class Customer {
    public id: string = "";
    public firstName: string = "";
    public phoneNumber: string = "";
    public email: string = "";
    public cc: string = "";
    public nif: string = "";

    public addressId: string | null = null;
    public userId: string | null = null;

    public address: Address = new Address();
    public user: User = new User();
}