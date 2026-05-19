import { Document } from "./document.model";

export class PropertyDocument {
    public id: string = "";
    public propertyId: string | null = null;
    public documentId: string | null = null;
    public document: Document = new Document();
}
