import { Preference } from "../models/preference.model";
import { Static_AmenetieType } from "../models/static/static-amenetieType.model";
import { Static_PropertyStatus } from "../models/static/static-propertystatus.model";
import { Static_PropertyType } from "../models/static/static-propertytype.model";
import { Static_PropertyTypology } from "../models/static/static-propertytypology.model";
import { AmenetieTypeStructure } from "./amenetie-type.structure";

export class PreferenceStructure {
    preference: Preference = <Preference>{};
    ameneties: Array<Static_AmenetieType>;

    constructor () {
        this.preference = new Preference();
        this.ameneties = new Array<Static_AmenetieType>();
    }
}