import { Static_PropertyTypology } from "./static/static-propertytypology.model";

export class PreferencePropertyTypology {
    public id: string = "";
    public preferenceId: string | null = null;
    public propertyTypologyId: number | null = null;
    public propertyTypology: Static_PropertyTypology = new Static_PropertyTypology();
}
