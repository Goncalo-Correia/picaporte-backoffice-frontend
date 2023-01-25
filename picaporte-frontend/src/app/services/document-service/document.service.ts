import { Injectable } from '@angular/core';
import { Document } from 'src/app/models/document.model';
import { DocumentStructure } from 'src/app/structures/document.structure';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentStructure: DocumentStructure = new DocumentStructure();
  documentStructureArray: Set<DocumentStructure> = new Set<DocumentStructure>();

  constructor() { }

  mapNewDocumentStructure(documentStructure: DocumentStructure): DocumentStructure {
    this.documentStructure = new DocumentStructure();

    this.documentStructure.document.id = documentStructure.document.id;
    this.documentStructure.document.documentName = documentStructure.document.documentName;
    this.documentStructure.document.filename = documentStructure.document.filename;

    this.documentStructure.document.requestedOn = documentStructure.document.requestedOn;
    this.documentStructure.document.requestedUserId = documentStructure.document.documentTypeId;
    this.documentStructure.document.uploadedOn = documentStructure.document.uploadedOn;
    this.documentStructure.document.uploadedUserId = documentStructure.document.documentTypeId;

    this.documentStructure.document.documentTypeId = documentStructure.document.documentTypeId;
    this.documentStructure.document.documentStatusId = documentStructure.document.documentTypeId;

    this.documentStructure.document.documentType = documentStructure.document.documentType;
    this.documentStructure.document.documentStatus = documentStructure.document.documentStatus;
    this.documentStructure.document.uploadedByUser = documentStructure.document.uploadedByUser;
    this.documentStructure.document.createdByUser = documentStructure.document.createdByUser;

    return this.documentStructure;
  }
}
