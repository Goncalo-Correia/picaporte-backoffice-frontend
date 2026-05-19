import { Preference } from "./preference.model";

export class UserPreference {
    public id: string = "";
    public userId: string | null = null;
    public preferenceId: string | null = null;
    public preference: Preference = new Preference();
}
