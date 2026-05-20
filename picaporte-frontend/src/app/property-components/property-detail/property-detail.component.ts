import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { CustomerService } from 'src/app/api-service/customer/customer.service';
import { StaticEnergyCertificateService } from 'src/app/api-service/static-energy-certificate/static-energy-certificate.service';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { StaticPropertyLocationTypeService } from 'src/app/api-service/static-property-location-type/property-location-type.service';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypeService } from 'src/app/api-service/static-property-type/static-property-type.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Customer } from 'src/app/models/customer.model';
import { Property } from 'src/app/models/property.model';
import { Static_EnergyCertificate } from 'src/app/models/static/static-energycertificate.model';
import { Static_PropertyConditionStatus } from 'src/app/models/static/static-propertyconditionstatus.model';
import { Static_PropertyLocationType } from 'src/app/models/static/static-propertylocationtype.model';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { Static_PropertyType } from 'src/app/models/static/static-propertytype.model';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { PropertyValidationObject } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  @Input() property: Property = <Property>{};
  @Input() isEditable: boolean = false;
  @Input() propertyValidationObject: PropertyValidationObject = new PropertyValidationObject();

  @Output() event_updatePropertyDetails = new EventEmitter<Property>();

  customers: Array<Customer> = new Array<Customer>();
  selectedCustomerName: string = "Nenhum cliente associado";

  staticPropertyTypes: Static_PropertyType[] = [];
  staticPropertyStatuses: Static_PropertyStatus[] = [];
  staticPropertyLocationTypes: Static_PropertyLocationType[] = [];
  staticPropertyConditionStatuses: Static_PropertyConditionStatus[] = [];
  staticPropertyTypologies: Static_PropertyTypology[] = [];
  staticEnergyCertificates: Static_EnergyCertificate[] = [];

  constructor(public customerService: CustomerService,
    public static_propertyTypeService: StaticPropertyTypeService, 
    public static_propertyStatusService: StaticPropertyStatusService, 
    public static_propertyLocationTypeService: StaticPropertyLocationTypeService, 
    public static_propertyConditionStatusService: StaticPropertyConditionStatusService, 
    public static_propertyTypologyService: StaticPropertyTypologyService,
    public static_energyCertificateService: StaticEnergyCertificateService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.get_Customers();
    if (this.property.customerId != null && this.property.customerId != '') {
      this.selectedCustomerName = this.getCustomerDisplayName(this.property.customer);
    }
    this.get_staticPropertyTypes();
    this.get_staticPropertyStatuses();
    this.get_staticPropertyConditionStatuses();
    this.get_staticPropertyTypologies();
    this.get_staticEnergyCertificates();
    this.get_staticPropertyLocationTypes();
  }

  onFocus_reference() {
    this.propertyValidationObject.isReferenceValid.isValid = true;
  }

  onFocus_price() {
    this.propertyValidationObject.isPriceValid.isValid = true;
  }

  onClick_selectCustomer(customer: Customer, customerName: string) {
    this.selectedCustomerName = customerName;

    this.property.customer = customer;
    this.property.customerId = customer.id;
    this.triggerEvent_updatePropertyDetails();
  }

  onClick_selectPropertyType(propertyType: Static_PropertyType) {
    this.property.propertyTypeId = propertyType.id;
    this.property.propertyType = propertyType;
    this.triggerEvent_updatePropertyDetails();
  }

  onClick_selectPropertyStatus(propertyStatus: Static_PropertyStatus) {
    this.property.propertyStatusId = propertyStatus.id;
    this.property.propertyStatus = propertyStatus;
    this.triggerEvent_updatePropertyDetails();
  }

  onClick_selectPropertyLocationType(propertyLocationType: Static_PropertyLocationType) {
    this.property.propertyLocationTypeId = propertyLocationType.id,
    this.property.propertyLocationType = propertyLocationType;
    this.triggerEvent_updatePropertyDetails();
  }

  onClick_selectPropertyConditionStatus(propertyConditionStatus: Static_PropertyConditionStatus) {
    this.property.propertyConditionStatusId = propertyConditionStatus.id;
    this.property.propertyConditionStatus = propertyConditionStatus;
    this.triggerEvent_updatePropertyDetails();
  }

  onClick_selectPropertyTypology(propertyTypology: Static_PropertyTypology) {
    this.property.propertyTypologyId = propertyTypology.id;
    this.property.propertyTypology = propertyTypology;
    this.triggerEvent_updatePropertyDetails();
  }

  onClick_selectEnergyCertificate(energyCertificate: Static_EnergyCertificate) {
    this.property.energyCertificateId = energyCertificate.id;
    this.property.energyCertificate = energyCertificate;
    this.triggerEvent_updatePropertyDetails();
  }

  triggerEvent_updatePropertyDetails() {
    this.event_updatePropertyDetails.emit(this.property);
  }

  private get_Customers() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.customerService.GetAll_Customers(resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.customers = this.coerceArray<Customer>(data);
      });
    });
  }

  getCustomerDisplayName(customer: Customer | null | undefined): string {
    if (customer == null) {
      return "Nenhum cliente associado";
    }

    if (customer.customerName != null && customer.customerName.trim() !== '') {
      return customer.customerName;
    }

    if (customer.firstName != null && customer.firstName.trim() !== '') {
      return customer.firstName;
    }

    return "Nenhum cliente associado";
  }

  private get_staticPropertyTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyTypeService.GetAll_PropertyTypes(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.staticPropertyTypes = this.coerceArray<Static_PropertyType>(data);
        this.staticPropertyTypes.push(new Static_PropertyType());
      });
    });
  }

  private get_staticPropertyStatuses() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyStatusService.GetAll_PropertyStatuses(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.staticPropertyStatuses = this.coerceArray<Static_PropertyStatus>(data);
        this.staticPropertyStatuses.push(new Static_PropertyStatus());
      });
    });
  }

  private get_staticPropertyTypologies() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyTypologyService.GetAll_PropertyTypology(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.staticPropertyTypologies = this.coerceArray<Static_PropertyTypology>(data);
        this.staticPropertyTypologies.push(new Static_PropertyTypology());
      });
    });
  }

  private get_staticPropertyConditionStatuses() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyConditionStatusService.GetAll_PropertyConditionStatuses(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.staticPropertyConditionStatuses = this.coerceArray<Static_PropertyConditionStatus>(data);
        this.staticPropertyConditionStatuses.push(new Static_PropertyConditionStatus());
      });
    });
  }

  private get_staticEnergyCertificates() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_energyCertificateService.GetAll_EnergyCertificates(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.staticEnergyCertificates = this.coerceArray<Static_EnergyCertificate>(data);
        this.staticEnergyCertificates.push(new Static_EnergyCertificate());
      });
    });
  }


  private get_staticPropertyLocationTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyLocationTypeService.GetAll_PropertyLocationTypes(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.staticPropertyLocationTypes = this.coerceArray<Static_PropertyLocationType>(data);
        this.staticPropertyLocationTypes.push(new Static_PropertyLocationType());
      });
    });
  }

  private coerceArray<T>(value: unknown): T[] {
    if (Array.isArray(value)) {
      return value;
    }

    return [];
  }
}
