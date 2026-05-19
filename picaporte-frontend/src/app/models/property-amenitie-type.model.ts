import { Static_AmenetieType } from "./static/static-amenetieType.model";

export class PropertyAmenetieType {
    public id: string = "";
    public propertyId: string | null = null;
    public amenetieTypeId: number | null = null;
    public amenetieType: Static_AmenetieType = new Static_AmenetieType();
}
