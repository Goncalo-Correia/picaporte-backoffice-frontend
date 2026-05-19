import { User } from "src/app/models/user.model";
import { PreferenceStructure } from "../preference.structure";

export class UserStructure {
    user: User = new User();
    customerId: string = "";
    customerName: string = "";
    preferences: Array<PreferenceStructure> = new Array<PreferenceStructure>();
    entityReferenceId: string = "";
}