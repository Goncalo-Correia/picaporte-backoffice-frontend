import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { CustomerService } from 'src/app/api-service/customer/customer.service';
import { RentingService } from 'src/app/api-service/renting/renting.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Customer } from 'src/app/models/customer.model';
import { Renting } from 'src/app/models/renting.model';

@Component({
  selector: 'app-property-renting',
  templateUrl: './property-renting.component.html',
  styleUrls: ['./property-renting.component.css']
})
export class PropertyRentingComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  @Input() propertyId: number = 0;

  rentingList: Array<Renting> = new Array<Renting>();
  selectedRenting: Renting = new Renting();
  selectedRowNumber: number = -1;
  selectedRentiongActionTypeLabel: string = ""

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
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.get_Customers();
    this.get_RentingsByProperty();
  }

  onClick_close() {
    this.selectedRowNumber = -1;
  }
  
  onClick_closeDelete() {
    this.toDeleteRowNumber = -1;
  }

  onClick_selectCustomer(customer: Customer) {
    this.selectedRenting.customer = customer;
  }

  onClick_remove(index: number) {
    this.toDeleteRenting = new Renting();
    this.toDeleteRenting = this.rentingList[index];
    this.toDeleteRowNumber = index;
  }

  onClick_submit() {
    if (this.selectedRowNumber == -1) {
      this.selectedRenting.propertyId = this.propertyId;
      this.post_Renting();
    } else {
      this.put_Renting();
    }
  }

  onClick_submitDelete() {

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
    this.selectedRenting.rentingActionType.id = rentingActionTypeId;
    this.selectedRowNumber = -1;
  }

  onClick_showModal_editRenting(index: number) {
    this.selectedRentiongActionTypeLabel = ""
    this.selectedRenting = new Renting();
    this.selectedRenting = this.rentingList[index];
    this.selectedRowNumber = index;
  }

  onClick_showModal_deleteRenting(index: number) {
    this.toDeleteRenting = new Renting();
    this.toDeleteRenting = this.rentingList[index];
    this.toDeleteRowNumber = index;
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
          
        });
      });
    }
  }

}

export enum Enum_RentingEvent {
  NEW_CONTRACT,
  CLOSE_CONTRACT,
  OBSERVATION
}
