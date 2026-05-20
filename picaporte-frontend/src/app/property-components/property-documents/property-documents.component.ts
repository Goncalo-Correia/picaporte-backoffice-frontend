import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { StaticDocumentTypeService } from 'src/app/api-service/static-document-type/static-document-type.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { DocumentDto } from 'src/app/models/document-dto.model';
import { Static_DocumentType } from 'src/app/models/static/static-documenttype.model';
import { DocumentService } from 'src/app/services/document-service/document.service';
import { DocumentValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { apiEndpoints, environment } from 'src/environments/environment';
declare let $: any;

@Component({
  selector: 'app-property-documents',
  templateUrl: './property-documents.component.html',
  styleUrls: ['./property-documents.component.css']
})
export class PropertyDocumentsComponent implements OnInit {

  documentBinaryUrl: string = environment.apiUrl + apiEndpoints.image.binary;

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  @Input() mainDocuments: Array<DocumentDto> = new Array<DocumentDto>();
  @Input() certificateDocuments: Array<DocumentDto> = new Array<DocumentDto>();
  @Input() otherDocuments: Array<DocumentDto> = new Array<DocumentDto>();
  @Input() isEditable: boolean = false;

  @Output() event_updateMainPropertyDocuments = new EventEmitter<Array<DocumentDto>>();
  @Output() event_updateCertificatePropertyDocuments = new EventEmitter<Array<DocumentDto>>();
  @Output() event_updateOtherPropertyDocuments = new EventEmitter<Array<DocumentDto>>();

  selectedDocumentStructure: DocumentDto = new DocumentDto();
  selectedDocumentTypeLabel: string = "Nenhum tipo seleccionado";
  selectedRowNumber: number = -1;
  private isMainDocument: boolean = false;
  allMainDocumentsToBeDeleted: boolean = false;
  private isCertificateDocument: boolean = false;
  allCertificateDocumentsToBeDeleted: boolean = false;
  private isOtherDocument: boolean = false;
  allOtherDocumentsToBeDeleted: boolean = false;
  documentValidationObject: DocumentValidationObject = new DocumentValidationObject();
  private documentTypes: Array<Static_DocumentType> = new Array<Static_DocumentType>();
  availableDocumentTypes: Array<Static_DocumentType> = new Array<Static_DocumentType>();

  constructor(
    private http: HttpClient,
    public documentTypeService: StaticDocumentTypeService,
    public documentService: DocumentService,
    private authenticationService: AuthenticationService,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
    this.get_documentTypes();
  }

  onFocus_file() {
    this.documentValidationObject.isFileValid.isValid = true;
  }

  onFocus_title() {
    this.documentValidationObject.isTitleValid.isValid = true;
  }

  onFocus_type() {
    this.documentValidationObject.isTypeValid.isValid = true;
  }

  onClick_addNewMainDocument() {
    this.selectedRowNumber = -1;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado";
    this.isMainDocument = true;
    this.isCertificateDocument = false;
    this.isOtherDocument = false;
    this.buildDocumentTypes(true, false, false);
    this.selectedDocumentStructure = new DocumentDto();

  }

  onClick_addNewCertificateDocument() {
    this.selectedRowNumber = -1;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado";
    this.isMainDocument = false;
    this.isCertificateDocument = true;
    this.isOtherDocument = false;
    this.buildDocumentTypes(false, true, false);
    this.selectedDocumentStructure = new DocumentDto();
  }

  onClick_addNewOtherDocument() {
    this.selectedRowNumber = -1;
    this.selectedDocumentTypeLabel = "Nenhum tipo seleccionado";
    this.isMainDocument = false;
    this.isCertificateDocument = false;
    this.isOtherDocument = true;
    this.buildDocumentTypes(false, false, true);
    this.selectedDocumentStructure = new DocumentDto();
  }

  onClick_selectDocumentType(documentType: Static_DocumentType, documentTypeLabel: string) {
    this.selectedDocumentTypeLabel = documentTypeLabel;
    this.selectedDocumentStructure.documentType = documentType;
    this.selectedDocumentStructure.documentTypeId = documentType.id;
    this.onFocus_type();
  }

  onChange_file(event: any) {
      var file = event.target.files[0];
      this.getBase64(file, event, this.selectedDocumentStructure);
  }

  private getBase64(file: any, event: any, documentStructure: DocumentDto) {
    var reader = new FileReader();
    reader.onload = function () {
      event.target.files[0].binary = (reader.result);
      documentStructure.content = event.target.files[0].binary;
      documentStructure.filename = event.target.files[0].name;
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


  onClick_editMainDocuments(index: number) {
    this.selectedRowNumber = index;
    this.isMainDocument = true;
    this.isCertificateDocument = false;
    this.isOtherDocument = false;
    this.selectedDocumentStructure = this.documentService.mapNewDocumentStructure(this.mainDocuments[index]);
    if (this.selectedDocumentStructure.documentType?.label != null) {
      this.selectedDocumentTypeLabel = this.selectedDocumentStructure.documentType.label;
    }
  }

  onClick_editCertificateDocuments(index: number) {
    this.selectedRowNumber = index;
    this.isMainDocument = false;
    this.isCertificateDocument = true;
    this.isOtherDocument = false;
    this.selectedDocumentStructure = this.documentService.mapNewDocumentStructure(this.certificateDocuments[index]);
    if (this.selectedDocumentStructure.documentType?.label != null) {
      this.selectedDocumentTypeLabel = this.selectedDocumentStructure.documentType.label;
    }
  }

  onClick_editOtherDocuments(index: number) {
    this.selectedRowNumber = index;
    this.isMainDocument = false;
    this.isCertificateDocument = false;
    this.isOtherDocument = true;
    this.selectedDocumentStructure = this.documentService.mapNewDocumentStructure(this.otherDocuments[index]);
    if (this.selectedDocumentStructure.documentType?.label != null) {
      this.selectedDocumentTypeLabel = this.selectedDocumentStructure.documentType.label;
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
    this.documentValidationObject = new DocumentValidationObject();
    this.documentValidationObject = this.validationService.validateDocument(this.selectedDocumentStructure.documentName, this.selectedDocumentStructure.documentType.label, this.selectedDocumentStructure.content);

    if (this.documentValidationObject.isValid) {
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
    this.closeModal();
  }

  onClick_openDocument(documentStructure: DocumentDto) {
    if (!documentStructure.filename) {
      this.messageComponent.showMessage("Documento indisponível");
      return;
    }

    this.authenticationService.refreshHttpOptions().then((resolve: any) => {
      this.http
        .get(
          `${this.documentBinaryUrl}${encodeURIComponent(documentStructure.filename)}/false`,
          {
            headers: resolve.headers,
            observe: 'response',
            responseType: 'blob'
          }
        )
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage("Erro ao abrir documento");
            return throwError(() => err);
          })
        )
        .subscribe(response => {
          this.openDocumentResponse(response, documentStructure);
        });
    });
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

  private closeModal(): void {
    $('#staticBackdrop').modal('hide');
  }

  private openDocumentResponse(response: HttpResponse<Blob>, documentStructure: DocumentDto) {
    const binaryContent = response.body;
    if (binaryContent == null) {
      this.messageComponent.showMessage("Documento indisponível");
      return;
    }

    const mimeType = binaryContent.type || documentStructure.mimeType || 'application/octet-stream';
    const blob = new Blob([binaryContent], { type: mimeType });
    const objectUrl = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');

    tempLink.href = objectUrl;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener';
    tempLink.download = documentStructure.filename;
    tempLink.click();

    window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
  }

  private get_documentTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => {
      this.documentTypeService.GetAll_DocumentTypes(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.documentTypes = <Static_DocumentType[]>data;
      });
    });
  }

  private buildDocumentTypes(isMainDocument: boolean, isCertificateDocument: boolean, isOtherDocument: boolean) {
    if (isMainDocument) {
      var localAvailableDocumentTypes = this.documentTypes.filter(prop => prop.isPrimary == true && prop.isCertificate == false);
      this.availableDocumentTypes = new Array<Static_DocumentType>();

      for (let index = 0; index < localAvailableDocumentTypes.length; index++) {
        if (this.mainDocuments.filter(prop => prop.documentTypeId == localAvailableDocumentTypes[index].id && !prop.isToDelete).length == 0) {
          this.availableDocumentTypes.push(localAvailableDocumentTypes[index]);
        }
      }
    }
    if (isCertificateDocument) {
      var localAvailableDocumentTypes = this.documentTypes.filter(prop => prop.isPrimary == false && prop.isCertificate == true);
      this.availableDocumentTypes = new Array<Static_DocumentType>();

      for (let index = 0; index < localAvailableDocumentTypes.length; index++) {
        if (this.certificateDocuments.filter(prop => prop.documentTypeId == localAvailableDocumentTypes[index].id && !prop.isToDelete).length == 0) {
          this.availableDocumentTypes.push(localAvailableDocumentTypes[index]);
        }
      }
    }
    if (isOtherDocument) {
      var localAvailableDocumentTypes = this.documentTypes.filter(prop => prop.isPrimary == false && prop.isCertificate == false);
      this.availableDocumentTypes = new Array<Static_DocumentType>();

      for (let index = 0; index < localAvailableDocumentTypes.length; index++) {
        if (this.otherDocuments.filter(prop => prop.documentTypeId == localAvailableDocumentTypes[index].id && !prop.isToDelete).length == 0) {
          this.availableDocumentTypes.push(localAvailableDocumentTypes[index]);
        }
      }
    }
  }

}
