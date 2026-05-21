import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { QueriesPropertyService } from 'src/app/api-service/queries-property/queries-property.service';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Address } from 'src/app/models/address.model';
import { ImageDto } from 'src/app/models/image-dto.model';
import { DocumentDto } from 'src/app/models/document-dto.model';
import { Property } from 'src/app/models/property.model';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { AmenetieTypeStructure } from 'src/app/structures/amenetie-type.structure';
import { PropertyStructure } from 'src/app/structures/main-structures/property.structure';
import { Enum_PropertySubMenu, PropertySubMenu, PropertySubMenuFactory } from 'src/app/submenus/property.submenu';
import { PropertyValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { Static_DocumentType } from 'src/app/models/static/static-documenttype.model';
import { StaticDocumentTypeService } from 'src/app/api-service/static-document-type/static-document-type.service';
import { QueriesEntityReferenceService } from 'src/app/api-service/queries-entity-reference/queries-entity-reference.service';
import { Enum_EntityType } from 'src/app/models/enum/entity-type.enum';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  propertyId: string = "";

  isEditable: boolean = false;
  isLoading: boolean = false;
  isDataFetched: boolean = false;

  propertyStructure: PropertyStructure;
  propertySubmenus: Array<PropertySubMenu>;
  selectedPropertySubMenu: Enum_PropertySubMenu = Enum_PropertySubMenu.DETAILS;
  propertyValidationObject: PropertyValidationObject = new PropertyValidationObject();

  isOnDetailsSubMenu: boolean = true;
  isOnTasksSubMenu: boolean = false;
  isOnCaracteristicsSubMenu: boolean = false;
  isOnDocumentsSubMenu: boolean = false;
  isOnImagesSubMenu: boolean = false;
  isOnRentingSubMenu: boolean = false;
  isOnRecommendedSubMenu: boolean = false;
  isOnActivityLogMenu: boolean = false;

  selectedDocumentType: Static_DocumentType = new Static_DocumentType();
  selectedDocumentTypeLabel: string = "Nenhum tipo seleccionado";
  documentTypes: Array<Static_DocumentType> = new Array<Static_DocumentType>();

  private propertySubmenuFactory: PropertySubMenuFactory;
  private destroyRef = inject(DestroyRef);

  constructor(
    public queries_propertyService: QueriesPropertyService,
    private queries_entityReference: QueriesEntityReferenceService,
    private activeRoute: ActivatedRoute,
    public amentieTypeService: StaticAmenetieTypeService,
    private authenticationService: AuthenticationService,
    private validationService: ValidationService,
    private documentTypeService: StaticDocumentTypeService,
    private router: Router
  ) {
    this.propertyStructure = new PropertyStructure();
    this.propertySubmenus = new Array<PropertySubMenu>();
    this.propertySubmenuFactory = new PropertySubMenuFactory();
  }

  ngOnInit(): void {
    this.getActiveRoute();
    this.get_propertySubmenus();
  }

  onClick_edit() {
    this.isEditable = true;
    this.get_propertySubmenus();
  }

  onClick_cancel() {
    this.isEditable = false;
    this.get_propertySubmenus();
    this.get_propertyStructure();
  }

  onClick_submit() {
    this.propertyValidationObject = new PropertyValidationObject();
    this.propertyValidationObject = this.validationService.validateProperty(
      this.propertyStructure.property.reference,
      this.propertyStructure.property.formattedPrice,
      this.propertyStructure.property.customerId,
      this.propertyStructure.property.address
    )
    if (this.propertyValidationObject.isValid) {
      this.isEditable = false;
      this.submit_property();
    } else {
      this.onClick_selectSubMenu(Enum_PropertySubMenu.DETAILS);
    }
  }

  onClick_selectSubMenu(enum_selectedCustomerSubMenu: Enum_PropertySubMenu | undefined) {
    if (enum_selectedCustomerSubMenu != undefined) {
      this.selectedPropertySubMenu = enum_selectedCustomerSubMenu;
    }
    this.checkSelectedSubMenu();
  }

  onClick_requestDocument() {
    this.selectedDocumentType = new Static_DocumentType();
    if (this.documentTypes.length == 0) {
      this.get_documentTypes();
    }
  }

  onClick_confirmDocumentRequest() {
    this.isLoading = true;
    this.authenticationService.refreshHttpOptions().then((resolve: any) => {
      this.queries_propertyService.Post_RequestDocument(this.selectedDocumentType.id, this.propertyId, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage("Erro a requisitar documento");
          return err;
        })
      )
      .subscribe(data => {
        this.messageComponent.isSuccess = true;
        this.messageComponent.showMessage("Documentor requisitado");
        this.get_propertyStructure();
      });
    });
  }

  onClick_selectDocumentType(documentType: Static_DocumentType, documentTypeLabel: string) {
    this.selectedDocumentTypeLabel = documentTypeLabel;
    this.selectedDocumentType = documentType;
  }

  eventHandler_updatePropertyOnline(data: boolean) {
    this.propertyStructure.property.isOnline = data;
  }

  eventHandler_updatePropertyDetails(data: Property) {
    this.propertyStructure.property = data;
  }

  eventHandler_updatePropertyAddress(data: Address) {
    this.propertyStructure.property.address = data;
  }

  eventHandler_updatePropertyCaracteristics(data: Array<AmenetieTypeStructure>) {
    this.propertyStructure.ameneties = data;
  }

  eventHandler_updateMainPropertyDocuments(data: Array<DocumentDto>) {
    this.propertyStructure.mainDocuments = data;
  }

  eventHandler_updateCertificatePropertyDocuments(data: Array<DocumentDto>) {
    this.propertyStructure.certificateDocuments = data;
  }

  eventHandler_updateOtherPropertyDocuments(data: Array<DocumentDto>) {
    this.propertyStructure.otherDocuments = data;
  }

  eventHandler_updatePropertyMainImage(data: ImageDto) {
    this.propertyStructure.mainImage = data;
  }

  eventHandler_updatePropertyOtherImages(data: Array<ImageDto>) {
    this.propertyStructure.images = data;
  }

  eventHandler_updatePropertyVideoUrl(data: string) {
    this.propertyStructure.property.videoUrl = data;
  }

  eventHandler_updateRecommendedProperties(data: Array<Property>) {
    this.propertyStructure.recommendedProperties = data;
  }

  eventHandler_updatePropertyObservationHistory(data: any) {

  }

  onClick_deleteProperty() {
    this.authenticationService.refreshHttpOptions().then((resolve: any) => {
      this.queries_entityReference.Delete_EntityReference(this.propertyId, Enum_EntityType.PROPERTY, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.router.navigateByUrl("Imoveis");
        });
    });
  }

  private submit_property() {
    this.isLoading = true;
    this.propertyStructure.property.price = this.unformatNumberFromSpaces(this.propertyStructure.property.formattedPrice);
    this.propertyStructure.property.livingArea = this.unformatNumberFromSpaces(this.propertyStructure.property.formattedLivingArea);
    this.propertyStructure.property.totalConstructionArea = this.unformatNumberFromSpaces(this.propertyStructure.property.formattedTotalConstructionArea);
    
    if (this.propertyStructure.property.id === "" || this.propertyStructure.property.id == null) {
      this.authenticationService.refreshHttpOptions().then((resolve: any) => {
        this.queries_propertyService.Post_PropertyStructure(this.propertyStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
             this.propertyStructure.property = <Property>data;
             this.propertyId = this.propertyStructure.property.id;
             this.router.navigateByUrl("Imovel/" + this.propertyId);
          });
      });
    } else {
      this.authenticationService.refreshHttpOptions().then((resolve: any) => {
        this.queries_propertyService.Put_PropertyStructure(this.propertyId, this.propertyStructure, resolve)
          .subscribe(data => {
            this.get_propertyStructure();
            this.onClick_selectSubMenu(Enum_PropertySubMenu.DETAILS);
          });
      });
    }
  }

  private get_propertyStructure() {
    this.isLoading = true;
    if (this.propertyId !== "" && this.propertyId != null) {
      this.isEditable = false;
      this.get_propertySubmenus();
      this.authenticationService.refreshHttpOptions().then((resolve: any) => {
        this.queries_propertyService.Get_PropertyStructure(this.propertyId, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.propertyStructure = this.normalizePropertyStructure(data);
            this.propertyStructure.property.formattedPrice = this.formatNumberWithSpaces(this.propertyStructure.property.price ?? 0);
            this.propertyStructure.property.formattedLivingArea = this.formatNumberWithSpaces(this.propertyStructure.property.livingArea ?? 0);
            this.propertyStructure.property.formattedTotalConstructionArea = this.formatNumberWithSpaces(this.propertyStructure.property.totalConstructionArea ?? 0);
            this.isDataFetched = true;
            this.isLoading = false;
          });
      });
    } else {
      this.propertyStructure = new PropertyStructure();
      this.selectedPropertySubMenu = Enum_PropertySubMenu.DETAILS;
      this.checkSelectedSubMenu();
      this.isEditable = true;
      this.get_propertySubmenus();

      this.authenticationService.refreshHttpOptions().then((resolve: any) => {
        this.amentieTypeService.GetAll_AmenetieTypes(true, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            var amenetieTypes: Array<Static_AmenetieType> = <Array<Static_AmenetieType>>data;

            amenetieTypes.forEach(element => {
              var amenetieTypeStructure: AmenetieTypeStructure = new AmenetieTypeStructure();
              amenetieTypeStructure.amenetieType = element;
              this.propertyStructure.ameneties.push(amenetieTypeStructure);
            });
            this.isDataFetched = true;
            this.isLoading = false;
          });
      });
    }
  }

  private get_propertySubmenus() {
    this.propertySubmenus = new Array<PropertySubMenu>();
    this.propertySubmenus = this.propertySubmenuFactory.getPropertySubmenus(this.isEditable, this.hasRecordId());
  }

  private hasRecordId(): boolean {
    return this.propertyId !== "" && this.propertyId != null;
  }

  private normalizePropertyStructure(data: unknown): PropertyStructure {
    const normalizedStructure = Object.assign(new PropertyStructure(), data as Partial<PropertyStructure>);

    normalizedStructure.property = Object.assign(new Property(), normalizedStructure.property);
    normalizedStructure.property.address = Object.assign(new Address(), normalizedStructure.property.address);
    normalizedStructure.property.mainImage = Object.assign(new ImageDto(), normalizedStructure.property.mainImage);

    normalizedStructure.mainImage = Object.assign(new ImageDto(), normalizedStructure.mainImage);
    normalizedStructure.mainDocuments = this.coerceArray<DocumentDto>(normalizedStructure.mainDocuments);
    normalizedStructure.certificateDocuments = this.coerceArray<DocumentDto>(normalizedStructure.certificateDocuments);
    normalizedStructure.otherDocuments = this.coerceArray<DocumentDto>(normalizedStructure.otherDocuments);
    normalizedStructure.images = this.coerceArray<ImageDto>(normalizedStructure.images);
    normalizedStructure.ameneties = this.coerceArray<AmenetieTypeStructure>(normalizedStructure.ameneties);
    normalizedStructure.recommendedProperties = this.coerceArray<Property>(normalizedStructure.recommendedProperties);

    return normalizedStructure;
  }

  private coerceArray<T>(value: unknown): T[] {
    if (Array.isArray(value)) {
      return value;
    }

    return [];
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
        this.documentTypes = this.coerceArray<Static_DocumentType>(data);
      });
    });
  }

  private getActiveRoute() {
    this.activeRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.propertyId = res.get('id') ?? '';
        this.get_propertyStructure();
      });
  }

  private checkSelectedSubMenu() {
    this.isOnDetailsSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.DETAILS;
    this.isOnTasksSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.TASKS;
    this.isOnCaracteristicsSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.CARACTERISTICS;
    this.isOnDocumentsSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.DOCUMENTS;
    this.isOnImagesSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.IMAGES;
    this.isOnRentingSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.RENTING_OBSERVATIONS;
    this.isOnRecommendedSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.RECOMMENDED;
    this.isOnActivityLogMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.HISTORY;
  }

  private formatNumberWithSpaces(number: number): string {
    let chunks = [];
    if (number != null) {
      let reversedStr = number.toString().split('').reverse().join('');
      
      for (let i = 0, length = reversedStr.length; i < length; i += 3) {
        chunks.push(reversedStr.substr(i, 3));
      }
    
    } 
    return chunks.join(' ').split('').reverse().join('');
  }

  private unformatNumberFromSpaces(formattedStr: string | null | undefined): number | null {
    if (formattedStr == null) {
      return null;
    }

    const numStr = formattedStr.replace(/\s+/g, '').trim();
    if (numStr === '') {
      return null;
    }

    const parsedNumber = parseInt(numStr, 10);
    return Number.isNaN(parsedNumber) ? null : parsedNumber;
  }
}

