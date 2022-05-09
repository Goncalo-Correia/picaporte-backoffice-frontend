import { Preference } from "../models/preference.model";
import { Static_AmenetieType } from "../models/static/static-amenetieType.model";
import { AmenetieTypeStructure } from "./amenetie-type.structure";

export class PreferenceStructure {
    preference: Preference = <Preference>{};
    ameneties: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
}