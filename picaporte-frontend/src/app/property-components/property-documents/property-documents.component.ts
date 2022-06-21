import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StaticDocumentTypeService } from 'src/app/api-service/static-document-type/static-document-type.service';
import { Document } from 'src/app/models/document.model';
import { Static_DocumentType } from 'src/app/models/static/static-documenttype.model';
import { DocumentService } from 'src/app/services/document-service/document.service';
import { DocumentStructure } from 'src/app/structures/document.structure';
declare let $: any;

@Component({
  selector: 'app-property-documents',
  templateUrl: './property-documents.component.html',
  styleUrls: ['./property-documents.component.css']
})
export class PropertyDocumentsComponent implements OnInit {

  @Input() mainDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
  @Input() certificateDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
  @Input() otherDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
  @Input() isEditable: boolean = false;

  @Output() event_updateMainPropertyDocuments = new EventEmitter<Array<DocumentStructure>>();
  @Output() event_updateCertificatePropertyDocuments = new EventEmitter<Array<DocumentStructure>>();
  @Output() event_updateOtherPropertyDocuments = new EventEmitter<Array<DocumentStructure>>();

  selectedDocumentStructure: DocumentStructure = new DocumentStructure(new Document(), false);
  selectedDocumentTypeLabel: string = "Nenhum tipo seleccionado";
  selectedRowNumber: number = -1;
  private isMainDocument: boolean = false;
  allMainDocumentsToBeDeleted: boolean = false;
  private isCertificateDocument: boolean = false;
  allCertificateDocumentsToBeDeleted: boolean = false; 
  private isOtherDocument: boolean = false;
  allOtherDocumentsToBeDeleted: boolean = false;
  
  private documentTypes: Array<Static_DocumentType> = new Array<Static_DocumentType>();
  availableDocumentTypes: Array<Static_DocumentType> = new Array<Static_DocumentType>();

  constructor(public documentTypeService: StaticDocumentTypeService, public documentService: DocumentService) { }

  ngOnInit(): void {
    this.get_documentTypes();
  }

  onClick_addNewMainDocument() {
    this.selectedRowNumber = -1;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado";
    this.isMainDocument = true;
    this.buildDocumentTypes(true, false, false);
    this.selectedDocumentStructure = new DocumentStructure(new Document(), false);
    console.log(this.availableDocumentTypes);
    
  }

  onClick_addNewCertificateDocument() {
    this.selectedRowNumber = -1;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado";
    this.isCertificateDocument = true;
    this.buildDocumentTypes(false, true, false);
    this.selectedDocumentStructure = new DocumentStructure(new Document(), false);
  }

  onClick_addNewOtherDocument() {
    this.selectedRowNumber = -1;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado";
    this.isOtherDocument = true;
    this.buildDocumentTypes(false, false, true);
    this.selectedDocumentStructure = new DocumentStructure(new Document(), false);
  }

  onClick_selectDocumentType(documentType: Static_DocumentType, documentTypeLabel: string) {
    this.selectedDocumentTypeLabel = documentTypeLabel;
    this.selectedDocumentStructure.document.documentType = documentType;
    this.selectedDocumentStructure.document.documentTypeId = documentType.id;
  }

  onChange_file(event: any) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        // binary data
        event.target.files[0].binary = e.target?.result;
      };
      reader.onerror = function(e) {
        // error occurred
        console.log('Error : ' + e.type);
      };

      reader.readAsBinaryString(file);
      
  }
  
  onClick_editMainDocuments(index: number) {
    this.selectedRowNumber = index;
    this.isMainDocument = true;
    this.selectedDocumentStructure = this.documentService.mapNewDocumentStructure(this.mainDocuments[index]);
    if (this.selectedDocumentStructure.document.documentType?.label != null) {
      this.selectedDocumentTypeLabel = this.selectedDocumentStructure.document.documentType.label;
    }
  }
  
  onClick_editCertificateDocuments(index: number) {
    this.selectedRowNumber = index;
    this.isCertificateDocument = true;
    this.selectedDocumentStructure = this.documentService.mapNewDocumentStructure(this.certificateDocuments[index]);
    if (this.selectedDocumentStructure.document.documentType?.label != null) {
      this.selectedDocumentTypeLabel = this.selectedDocumentStructure.document.documentType.label;
    }
  }

  onClick_editOtherDocuments(index: number) {
    this.selectedRowNumber = index;
    this.isOtherDocument = true;
    this.selectedDocumentStructure = this.documentService.mapNewDocumentStructure(this.otherDocuments[index]);
    if (this.selectedDocumentStructure.document.documentType?.label != null) {
      this.selectedDocumentTypeLabel = this.selectedDocumentStructure.document.documentType.label;
    }
  }

  onClick_remove(index: number) {
    if (this.isMainDocument) {
      this.mainDocuments[index].isToDelete = true;
      this.allMainDocumentsToBeDeleted = this.mainDocuments.filter(prop => prop.isToDelete == false).length == 0;
    }
    if (this.isCertificateDocument) {
      this.certificateDocuments[index].isToDelete = true;
      this.allCertificateDocumentsToBeDeleted = this.certificateDocuments.filter(prop => prop.isToDelete == false).length == 0;
    }
    if (this.isOtherDocument) {
      this.otherDocuments[index].isToDelete = true;
      this.allOtherDocumentsToBeDeleted = this.otherDocuments.filter(prop => prop.isToDelete == false).length == 0;
    }

    this.isMainDocument = false;
    this.isCertificateDocument = false;
    this.isOtherDocument = false;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado"; 
  }

  onClick_close() {
    this.isMainDocument = false;
    this.isCertificateDocument = false;
    this.isOtherDocument = false;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado"; 
  }

  onClick_submit() {
    var myFile = $('#file').prop('files')[0];
    /*
    if (this.selectedDocumentStructure.document.file != null) {
      this.selectedDocumentStructure.document.file.fileBinary = myFile.binary;
      this.selectedDocumentStructure.document.file.fileName = myFile.name;
    }
    */
    
    if (this.isMainDocument) {
      if (this.selectedRowNumber > -1) {
        
        this.mainDocuments[this.selectedRowNumber] = this.selectedDocumentStructure;
      } else {
        this.mainDocuments.push(this.selectedDocumentStructure);
      }
      this.allMainDocumentsToBeDeleted = false;
      this.triggerEvent_updateMainPropertyDocuments();
    }
    if (this.isCertificateDocument) {
      if (this.selectedRowNumber > -1) {
        this.certificateDocuments[this.selectedRowNumber] = this.selectedDocumentStructure;
      } else {
        this.certificateDocuments.push(this.selectedDocumentStructure);
      }
      this.allCertificateDocumentsToBeDeleted = false;
      this.triggerEvent_updateCertificatePropertyDocuments();
    }
    if (this.isOtherDocument) {
      if (this.selectedRowNumber > -1) {
        this.otherDocuments[this.selectedRowNumber] = this.selectedDocumentStructure;
      } else {
        this.otherDocuments.push(this.selectedDocumentStructure);
      }
      this.allOtherDocumentsToBeDeleted = false;
      this.triggerEvent_updateOtherPropertyDocuments();
    }
  }

  triggerEvent_updateMainPropertyDocuments() {
    this.event_updateMainPropertyDocuments.emit(this.mainDocuments);
  }

  triggerEvent_updateCertificatePropertyDocuments() {
    this.event_updateCertificatePropertyDocuments.emit(this.certificateDocuments);
  }

  triggerEvent_updateOtherPropertyDocuments() {
    this.event_updateOtherPropertyDocuments.emit(this.otherDocuments);
  }

  private get_documentTypes() {
    this.documentTypeService.GetAll_DocumentTypes().subscribe((data: {}) => {
      this.documentTypes = <Static_DocumentType[]>data;
    });;
  }

  private buildDocumentTypes(isMainDocument: boolean, isCertificateDocument: boolean, isOtherDocument: boolean) {
    if (isMainDocument) {
      var localAvailableDocumentTypes = this.documentTypes.filter(prop => prop.isPrimary == true && prop.isCertificate == false);
      this.availableDocumentTypes = new Array<Static_DocumentType>();
      
      for (let index = 0; index < localAvailableDocumentTypes.length; index++) {
        if (this.mainDocuments.filter(prop => prop.document.documentTypeId == localAvailableDocumentTypes[index].id && !prop.isToDelete).length == 0) {
          this.availableDocumentTypes.push(localAvailableDocumentTypes[index]);
        }
      }
    }
    if (isCertificateDocument) {
      var localAvailableDocumentTypes = this.documentTypes.filter(prop => prop.isPrimary == false && prop.isCertificate == true);
      this.availableDocumentTypes = new Array<Static_DocumentType>();
      
      for (let index = 0; index < localAvailableDocumentTypes.length; index++) {
        if (this.certificateDocuments.filter(prop => prop.document.documentTypeId == localAvailableDocumentTypes[index].id && !prop.isToDelete).length == 0) {
          this.availableDocumentTypes.push(localAvailableDocumentTypes[index]);
        }
      }
    }
    if (isOtherDocument) {
      var localAvailableDocumentTypes = this.documentTypes.filter(prop => prop.isPrimary == false && prop.isCertificate == false);
      this.availableDocumentTypes = new Array<Static_DocumentType>();
      
      for (let index = 0; index < localAvailableDocumentTypes.length; index++) {
        if (this.otherDocuments.filter(prop => prop.document.documentTypeId == localAvailableDocumentTypes[index].id && !prop.isToDelete).length == 0) {
          this.availableDocumentTypes.push(localAvailableDocumentTypes[index]);
        }
      }
    }
  }

}

