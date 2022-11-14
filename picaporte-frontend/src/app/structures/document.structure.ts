import { Document } from "../models/document.model";

export class DocumentStructure {
    public document: Document = new Document();
    public content: string = "";
    public isToDelete: boolean = false;
}