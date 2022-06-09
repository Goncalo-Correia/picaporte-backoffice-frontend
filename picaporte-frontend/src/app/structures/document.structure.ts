import { Document } from "../models/document.model";

export class DocumentStructure {
    constructor(
        public document: Document,
        public isToDelete: boolean
    ) {}
}