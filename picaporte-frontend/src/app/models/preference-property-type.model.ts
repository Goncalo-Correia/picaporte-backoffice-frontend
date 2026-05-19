import { Static_PropertyType } from "./static/static-propertytype.model";

export class PreferencePropertyType {
    public id: string = "";
    public preferenceId: string | null = null;
    public propertyTypeId: number | null = null;
    public propertyType: Static_PropertyType = new Static_PropertyType();
}
