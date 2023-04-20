import { Preference } from "../models/preference.model";
import { Static_AmenetieType } from "../models/static/static-amenetieType.model";
import { Static_PropertyType } from "../models/static/static-propertytype.model";
import { Static_PropertyTypology } from "../models/static/static-propertytypology.model";

export class PreferenceStructure {
    preference: Preference = <Preference>{};
    propertyTypes: Array<Static_PropertyType>;
    propertyTypologies: Array<Static_PropertyTypology>;
    ameneties: Array<Static_AmenetieType>;

    constructor () {
        this.preference = new Preference();
        this.propertyTypes = new Array<Static_PropertyType>();
        this.propertyTypologies = new Array<Static_PropertyTypology>();
        this.ameneties = new Array<Static_AmenetieType>();
    }
}