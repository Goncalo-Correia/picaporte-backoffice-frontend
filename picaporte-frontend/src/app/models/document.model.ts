import { Static_DocumentStatus } from "./static/static-documentstatus.model";
import { Static_DocumentType } from "./static/static-documenttype.model";
import { User } from "./user.model";

export class Document {
    public id: number = 0;
    public documentName: string = "";
    public filename: string = "";
    public requestedOn: Date = new Date();
    public uploadedOn: Date = new Date();
    public content: string = "";
    public isToDelete: boolean = false;
    
    public documentTypeId: number = 0;
    public documentStatusId: number = 0;
    public uploadedUserId: number = 0;
    public requestedUserId: number = 0;

    public documentType: Static_DocumentType = new Static_DocumentType();
    public documentStatus: Static_DocumentStatus = new Static_DocumentStatus();
    public uploadedByUser: User = new User();
    public createdByUser: User = new User();
}