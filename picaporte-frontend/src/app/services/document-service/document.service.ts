import { Injectable } from '@angular/core';
import { DocumentDto } from 'src/app/models/document-dto.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentStructure: DocumentDto = new DocumentDto();
  documentStructureArray: Set<DocumentDto> = new Set<DocumentDto>();

  constructor() { }

  mapNewDocumentStructure(documentStructure: DocumentDto): DocumentDto {
    this.documentStructure = new DocumentDto();

    this.documentStructure.id = documentStructure.id;
    this.documentStructure.documentName = documentStructure.documentName;
    this.documentStructure.filename = documentStructure.filename;
    this.documentStructure.mimeType = documentStructure.mimeType;
    this.documentStructure.content = documentStructure.content;
    this.documentStructure.isToDelete = documentStructure.isToDelete;
    this.documentStructure.uploadedOn = documentStructure.uploadedOn;

    this.documentStructure.documentTypeId = documentStructure.documentTypeId;
    this.documentStructure.documentStatusId = documentStructure.documentStatusId;

    this.documentStructure.documentType = documentStructure.documentType;
    this.documentStructure.documentStatus = documentStructure.documentStatus;

    return this.documentStructure;
  }
}
