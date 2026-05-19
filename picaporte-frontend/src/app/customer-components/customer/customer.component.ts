import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { QueriesCustomerService } from 'src/app/api-service/queries-customer/queries-customer.service';
import { QueriesEntityReferenceService } from 'src/app/api-service/queries-entity-reference/queries-entity-reference.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Address } from 'src/app/models/address.model';
import { Customer } from 'src/app/models/customer.model';
import { Enum_EntityType } from 'src/app/models/enum/entity-type.enum';
import { AddressValidationObject, CustomerValidationObject, UserValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { CustomerStructure } from 'src/app/structures/main-structures/customer.structure';
import { PreferenceStructure } from 'src/app/structures/preference.structure';
import { CustomerSubMenu, CustomerSubMenuFactory, Enum_CustomerSubMenu } from 'src/app/submenus/customer.submenu';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  customerId: string = "";

  isEditable: boolean = false;
  isLoading: boolean = false;
  isDataFetched: boolean = false;

  customerStructure: CustomerStructure;
  customerSubmenus: Array<CustomerSubMenu>;
  selectedCustomerSubMenu: Enum_CustomerSubMenu = Enum_CustomerSubMenu.DETAILS;
  customerValidationObject: CustomerValidationObject = new CustomerValidationObject();
  addressValidationObject: AddressValidationObject = new AddressValidationObject();

  isOnDetailsSubMenu: boolean = true;
  isOnTasksSubMenu: boolean = false;
  isOnPreferencesSubMenu: boolean = false;
  isOnPropertiesSubMenu: boolean = false;
  isOnActivityLogMenu: boolean = false;

  private customerSubmenuFactory: CustomerSubMenuFactory;

  constructor(
    public queries_customerService: QueriesCustomerService, 
    private queries_entityReference: QueriesEntityReferenceService,
    private activeRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private validationService: ValidationService,
    private router: Router
    ) { 
    this.customerStructure = new CustomerStructure();
    this.customerSubmenus = new Array<CustomerSubMenu>();
    this.customerSubmenuFactory = new CustomerSubMenuFactory();
  }

  ngOnInit(): void {
    this.getActiveRoute();
    this.get_customerSubmenus();
    if (this.customerId !== "") {
      this.get_customerStructure();
    } else {
      this.isDataFetched = true;
    }
  }

  onClick_edit() {
    this.isEditable = true;
  }

  onClick_cancel() {
    this.isEditable = false;
    if (this.customerId !== "") {
      this.get_customerStructure();
    }
  }

  onClick_submit() {
    this.isEditable = false;
    this.customerValidationObject = new CustomerValidationObject();
    this.customerValidationObject = this.validationService.validateCustomer(
      this.customerStructure.customer.firstName,
      this.customerStructure.customer.address);
    this.addressValidationObject = new AddressValidationObject();
    this.addressValidationObject = this.validationService.validateAddress(
      this.customerStructure.customer.address.zipCode
    );
    if (this.customerValidationObject.isValid) {
      this.submit_customer();
    } else {
      this.isEditable = true;
    }
  }

  onClick_selectSubMenu(enum_selectedCustomerSubMenu: Enum_CustomerSubMenu | undefined) {
    if (enum_selectedCustomerSubMenu != undefined) {
      this.selectedCustomerSubMenu = enum_selectedCustomerSubMenu;
    }
    this.checkSelectedSubMenu();
  }

  eventHandler_updateCustomerDetails(data: Customer) {
    this.customerStructure.customer = data;
  }

  eventHandler_updateCustomerAddress(data: Address) {
    if (this.customerStructure.customer != undefined) {
      this.customerStructure.customer.address = data;
    }
  }

  eventHandler_updateCustomerPreferences(data: Array<PreferenceStructure>) {
    this.customerStructure.preferences = [...data];
  }
  
  onClick_deleteCustomer() {
    this.authenticationService.refreshHttpOptions().then((resolve: any) => {
      this.queries_entityReference.Delete_EntityReference(this.customerId, Enum_EntityType.CUSTOMER, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.router.navigateByUrl("Clientes");
        });
    });
  }

  private get_customerStructure() {
    this.isLoading = true;
    this.isDataFetched = false;
    if (this.customerId !== "" && this.customerId != null) {
      this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
        this.queries_customerService.Get_CustomerStructure(this.customerId, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.customerStructure = <CustomerStructure>data;
          this.isDataFetched = true;
          this.isLoading = false;
        });
      });
    } else {
      this.isDataFetched = true;
      this.isLoading = false;
      this.isEditable = true;
    }
  }

  private get_customerSubmenus() {
    this.customerSubmenus = this.customerSubmenuFactory.getCustomerSubmenus();
  }

  private submit_customer() {
    this.isLoading = true;

    if (this.customerStructure.customer.id === "" || this.customerStructure.customer.id == null) {
      this.authenticationService.refreshHttpOptions().then((resolve:any) => {
        this.queries_customerService.Post_CustomerStructure(this.customerStructure, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.customerStructure.customer = <Customer>data;
          this.customerId = this.customerStructure.customer.id;
          this.get_customerStructure();
        });
      });
    } else {
      this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
        this.queries_customerService.Put_CustomerStructure(this.customerId, this.customerStructure, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.get_customerStructure();
        });
      });
    }
  }

  private getActiveRoute() {
    this.activeRoute.paramMap.subscribe(res => {
      this.customerId = res.get('id') ?? "";
    });  
  }

  private checkSelectedSubMenu() {
    this.isOnDetailsSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.DETAILS;
    this.isOnTasksSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.TASKS;
    this.isOnPreferencesSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.PREFERENCES;
    this.isOnPropertiesSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.PROPERTIES;
    this.isOnActivityLogMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.HISTORY;
  }
}

