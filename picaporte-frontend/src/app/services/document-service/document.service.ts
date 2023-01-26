import { Injectable } from '@angular/core';
import { Document } from 'src/app/models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentStructure: Document = new Document();
  documentStructureArray: Set<Document> = new Set<Document>();

  constructor() { }

  mapNewDocumentStructure(documentStructure: Document): Document {
    this.documentStructure = new Document();

    this.documentStructure.id = documentStructure.id;
    this.documentStructure.documentName = documentStructure.documentName;
    this.documentStructure.filename = documentStructure.filename;
    this.documentStructure.content = documentStructure.content;
    this.documentStructure.isToDelete = documentStructure.isToDelete;

    this.documentStructure.requestedOn = documentStructure.requestedOn;
    this.documentStructure.requestedUserId = documentStructure.documentTypeId;
    this.documentStructure.uploadedOn = documentStructure.uploadedOn;
    this.documentStructure.uploadedUserId = documentStructure.documentTypeId;

    this.documentStructure.documentTypeId = documentStructure.documentTypeId;
    this.documentStructure.documentStatusId = documentStructure.documentTypeId;

    this.documentStructure.documentType = documentStructure.documentType;
    this.documentStructure.documentStatus = documentStructure.documentStatus;
    this.documentStructure.uploadedByUser = documentStructure.uploadedByUser;
    this.documentStructure.createdByUser = documentStructure.createdByUser;

    return this.documentStructure;
  }
}
