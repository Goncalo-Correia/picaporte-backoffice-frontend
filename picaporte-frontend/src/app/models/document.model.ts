import { Static_DocumentStatus } from "./static/static-documentstatus.model";
import { Static_DocumentType } from "./static/static-documenttype.model";
import { User } from "./user.model";

export class Document {
    constructor(
        public id?: number,
        public documentName?: string,
        public fileName?: string,
        public requestedOn?: Date,
        public uploadedOn?: Date,
        
        public documentTypeId?: number,
        public documentStatusId?: number,
        public uploadedUserId?: number,
        public requestedUserId?: number,

        public documentType?: Static_DocumentType,
        public documentStatus?: Static_DocumentStatus,
        public uploadedByUser?: User,
        public createdByUser?: User
    ) {};
}