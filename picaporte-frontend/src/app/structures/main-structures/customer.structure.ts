import { BusinessCard } from "../../models/businesscard.model";
import { Customer } from "../../models/customer.model";
import { Property } from "../../models/property.model";
import { PreferenceStructure } from "../preference.structure";

export class CustomerStructure {
    customer: Customer = <Customer>{};
    businessCards: Array<BusinessCard> = new Array<BusinessCard>();
    preferences: Array<PreferenceStructure> = new Array<PreferenceStructure>();
    properties: Array<Property> = new Array<Property>();
}