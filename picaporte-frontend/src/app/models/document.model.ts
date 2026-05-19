import { Static_DocumentStatus } from "./static/static-documentstatus.model";
import { Static_DocumentType } from "./static/static-documenttype.model";

export class Document {
    public id: string = "";
    public documentName: string = "";
    public filename: string = "";
    public mimeType: string = "";
    public uploadedOn: Date | null = null;

    public documentTypeId: number | null = null;
    public documentStatusId: number | null = null;

    public documentType: Static_DocumentType = new Static_DocumentType();
    public documentStatus: Static_DocumentStatus = new Static_DocumentStatus();
}