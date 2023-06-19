import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { CustomerService } from 'src/app/api-service/customer/customer.service';
import { RentingService } from 'src/app/api-service/renting/renting.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Customer } from 'src/app/models/customer.model';
import { Renting } from 'src/app/models/renting.model';
import { RentingValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { apiEndpoints, environment } from 'src/environments/environment';
declare let $: any;

@Component({
  selector: 'app-property-renting',
  templateUrl: './property-renting.component.html',
  styleUrls: ['./property-renting.component.css']
})
export class PropertyRentingComponent implements OnInit {

  url: string = environment.apiUrl + apiEndpoints.image.renting;
  
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  @Input() propertyId: number = 0;

  isDataFetched: boolean = false;

  rentingList: Array<Renting> = new Array<Renting>();
  selectedRenting: Renting = new Renting();
  selectedRowNumber: number = -1;
  selectedRentiongActionTypeLabel: string = ""

  rentingValidationObject: RentingValidationObject = new RentingValidationObject();

  toDeleteRenting: Renting = new Renting();
  toDeleteRowNumber: number = -1;

  customerList: Array<Customer> = new Array<Customer>();
  selectedCustomerLabel: string = "Seleccionar inquilino"

  public get rentingEvent(): typeof Enum_RentingEvent {
    return Enum_RentingEvent; 
  }

  constructor(
    public customerService: CustomerService,
    public rentingService: RentingService,
    private authenticationService: AuthenticationService,
    private validationService: ValidationService
    ) { }

  ngOnInit(): void {
    this.get_Customers();
    this.get_RentingsByProperty();
  }

  onFocus_title() {
    this.rentingValidationObject.isTitleValid.isValid = true;
  }

  onFocus_comment() {
    this.rentingValidationObject.isCommentValid.isValid = true;
  }

  onClick_close() {
    this.rentingValidationObject.isTitleValid.isValid = true;
    this.rentingValidationObject.isCommentValid.isValid = true;
    this.rentingValidationObject.isCustomerValid.isValid = true;
    this.selectedRowNumber = -1;
    this.selectedRenting = new Renting();
  }
  
  onClick_closeDelete() {
    this.toDeleteRowNumber = -1;
  }

  onClick_selectCustomer(customer: Customer) {
    this.rentingValidationObject.isCustomerValid.isValid = true;
    this.selectedRenting.customerId = customer.id;
    this.selectedRenting.customer = customer;
  }

  onChange_file(event: any) {
    var file = event.target.files[0];
    this.getBase64(file, this.selectedRenting);
  }

  private getBase64(file: any, renting: Renting) {
    var reader = new FileReader();
    reader.onload = function () {
      file.binary = (reader.result);
      renting.content = file.binary;
      renting.filename = file.name;
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onClick_remove(index: number) {
    this.toDeleteRenting = new Renting();
    this.toDeleteRenting = this.rentingList[index];
    this.toDeleteRowNumber = index;
  }

  onClick_submit() {
    this.rentingValidationObject = this.validationService.validateRenting(this.selectedRenting.title, this.selectedRenting.customerId, this.selectedRenting.comment);
    if (this.rentingValidationObject.isValid) {
      this.isDataFetched = false;
      this.selectedRenting.propertyId = this.propertyId;
      if (this.selectedRowNumber == -1) {
        this.post_Renting();
      } else {
        this.put_Renting();
      }
      this.closeRentingModal();
    }
  }

  onClick_submitDelete() {
    this.isDataFetched = false;
    this.delete_Renting();
  }

  onClick_showModal_newRenting(rentingActionTypeId: number) {
    this.selectedRenting = new Renting();
    if (rentingActionTypeId == Enum_RentingEvent.NEW_CONTRACT) {
      this.selectedRentiongActionTypeLabel = "Novo contrato";
    } else if (rentingActionTypeId == Enum_RentingEvent.CLOSE_CONTRACT) {
      this.selectedRentiongActionTypeLabel = "Terminar contrato";
    } else {
      this.selectedRentiongActionTypeLabel = "Observação";
    }
    this.selectedRenting.staticRentingActionTypeId = rentingActionTypeId;
    this.selectedRowNumber = -1;
  }

  onClick_showModal_editRenting(index: number) {
    this.selectedRentiongActionTypeLabel = ""
    this.selectedRenting = new Renting();
    this.selectedRenting = this.mapRenting(this.rentingList[index]);
    this.selectedRowNumber = index;
  }

  onClick_showModal_deleteRenting(index: number) {
    this.toDeleteRenting = new Renting();
    this.toDeleteRenting = this.rentingList[index];
    this.toDeleteRowNumber = index;
  }

  private closeRentingModal(): void {
    $('#createUpdateModal').modal('hide');
  }

  private mapRenting(inputRenting: Renting): Renting {
    let outputRenting = new Renting();

    outputRenting.id = inputRenting.id;
    outputRenting.staticRentingActionTypeId = inputRenting.staticRentingActionTypeId;
    outputRenting.customerId = inputRenting.customerId;
    outputRenting.propertyId = inputRenting.propertyId;
    outputRenting.title = inputRenting.title;
    outputRenting.comment = inputRenting.comment;
    outputRenting.filename = inputRenting.filename;
    outputRenting.createdById = inputRenting.createdById;
    outputRenting.createdOn = inputRenting.createdOn;
    outputRenting.lastModifiedById = inputRenting.lastModifiedById;
    outputRenting.lastModifiedOn = inputRenting.lastModifiedOn;

    outputRenting.staticRentingActionType = inputRenting.staticRentingActionType;
    outputRenting.customer = inputRenting.customer;
    outputRenting.createdBy = inputRenting.createdBy;
    outputRenting.lastModifiedBy = inputRenting.lastModifiedBy;

    return outputRenting;
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
        this.customerList = <Customer[]>data;
      });
    });
  }

  private get_RentingsByProperty() {
    this.isDataFetched = false;
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.rentingService.GetRentingsByPropertyId(this.propertyId, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.rentingList = <Renting[]>data;
        this.isDataFetched = true;
      });
    });
  }

  private post_Renting() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.rentingService.Post_Renting(this.selectedRenting, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.get_RentingsByProperty();
        this.selectedRenting = new Renting();
      });
    });
  }

  private put_Renting() {
    if (this.selectedRenting.id != null) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.rentingService.Put_Renting(this.selectedRenting.id, this.selectedRenting, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.get_RentingsByProperty();
          this.selectedRenting = new Renting();
        });
      });
    }
  }

  private delete_Renting() {
    if (this.selectedRenting.id != null) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.rentingService.Delete_Renting(this.toDeleteRenting.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.get_RentingsByProperty();
          this.selectedRenting = new Renting();
        });
      });
    }
  }

}

export enum Enum_RentingEvent {
  NONE,
  NEW_CONTRACT,
  CLOSE_CONTRACT,
  OBSERVATION
}
