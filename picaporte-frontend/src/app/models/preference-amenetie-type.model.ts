import { Static_AmenetieType } from "./static/static-amenetieType.model";

export class PreferenceAmenetieType {
    public id: string = "";
    public preferenceId: string | null = null;
    public amenetieTypeId: number | null = null;
    public amenetieType: Static_AmenetieType = new Static_AmenetieType();
}
