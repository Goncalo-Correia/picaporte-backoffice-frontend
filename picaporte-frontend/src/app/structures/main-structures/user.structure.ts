import { User } from "src/app/models/user.model";
import { PreferenceStructure } from "../preference.structure";

export class UserStructure {
    user: User = new User();
    customerId: number = 0;
    customerName: string = "";
    preferences: Array<PreferenceStructure> = new Array<PreferenceStructure>();
    entityReferenceId: number = 0;
}