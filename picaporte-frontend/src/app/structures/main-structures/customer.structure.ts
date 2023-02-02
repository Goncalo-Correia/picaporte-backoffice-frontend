import { Customer } from "../../models/customer.model";
import { Property } from "../../models/property.model";
import { PreferenceStructure } from "../preference.structure";

export class CustomerStructure {
    customer: Customer = new Customer();
    preferences: Array<PreferenceStructure> = new Array<PreferenceStructure>();
    properties: Array<Property> = new Array<Property>();
    entityReferenceId: number = 0;
}