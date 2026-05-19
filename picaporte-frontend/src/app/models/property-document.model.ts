import { Document } from "./document.model";
import { Property } from "./property.model";

export class PropertyDocument {
    public id: string = "";
    public propertyId: string | null = null;
    public documentId: string | null = null;
    public property: Property = new Property();
    public document: Document = new Document();
}
