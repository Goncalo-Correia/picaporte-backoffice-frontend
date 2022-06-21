import { Address } from "./address.model";
import { Preference } from "./preference.model";
import { User } from "./user.model";
import { Property } from "./property.model";

export class Customer {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public email: string,
        public cc: string,
        public nif: string,

        public addressId: number,
        public userId: number,

        public address: Address,
        public user: User,
        public preferences: Array<Preference>,
        public properties: Array<Property>
    ) {};
}