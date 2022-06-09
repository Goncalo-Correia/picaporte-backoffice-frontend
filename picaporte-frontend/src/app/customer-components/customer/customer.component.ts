import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueriesCustomerService } from 'src/app/api-service/queries-customer/queries-customer.service';
import { Address } from 'src/app/models/address.model';
import { Customer } from 'src/app/models/customer.model';
import { Property } from 'src/app/models/property.model';
import { CustomerStructure } from 'src/app/structures/main-structures/customer.structure';
import { PreferenceStructure } from 'src/app/structures/preference.structure';
import { CustomerSubMenu, CustomerSubMenuFactory, Enum_CustomerSubMenu } from 'src/app/submenus/customer.submenu';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private customerId: number = 0;

  isEditable: boolean = false;
  isLoading: boolean = false;
  isDataFetched: boolean = false;

  customerStructure: CustomerStructure;
  customerSubmenus: Array<CustomerSubMenu>;
  selectedCustomerSubMenu: Enum_CustomerSubMenu = Enum_CustomerSubMenu.DETAILS;

  isOnDetailsSubMenu: boolean = true;
  isOnTasksSubMenu: boolean = false;
  isOnPreferencesSubMenu: boolean = false;
  isOnPropertiesSubMenu: boolean = false;
  isOnHistorySubMenu: boolean = false;

  private customerSubmenuFactory: CustomerSubMenuFactory;

  constructor(public queries_customerService: QueriesCustomerService, private activeRoute: ActivatedRoute) { 
    this.customerStructure = new CustomerStructure();
    this.customerSubmenus = new Array<CustomerSubMenu>();
    this.customerSubmenuFactory = new CustomerSubMenuFactory();
  }

  ngOnInit(): void {
    this.getActiveRoute();
    this.get_customerSubmenus();
    this.get_customerStructure();
  }

  onClick_edit() {
    this.isEditable = true;
  }

  onClick_cancel() {
    this.isEditable = false;
    this.get_customerStructure();
  }

  onClick_submit() {
    this.isEditable = false;
    this.submit_customer();
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
  
  private get_customerStructure() {
    this.isLoading = true;
    this.isDataFetched = false;
    this.queries_customerService.Get_CustomerStructure(this.customerId).subscribe((data: {}) => {
      this.customerStructure = <CustomerStructure>data;
      this.isDataFetched = true;
      this.isLoading = false;
    });;
  }

  private get_customerSubmenus() {
    this.customerSubmenus = this.customerSubmenuFactory.getCustomerSubmenus();
  }

  private submit_customer() {
    this.isLoading = true;
    if (this.customerStructure.customer.id == 0) {
      this.queries_customerService.Post_CustomerStructure(this.customerStructure).subscribe((data: {}) => {
        this.customerStructure = <CustomerStructure>data;
        this.customerId = this.customerStructure.customer.id;
        this.isLoading = false;
      });
    } else {
      this.queries_customerService.Put_CustomerStructure(this.customerId, this.customerStructure).subscribe((data: {}) => {
        this.customerStructure = <CustomerStructure>data;
        this.isLoading = false;
      });
    }
  }

  private getActiveRoute() {
    this.activeRoute.paramMap.subscribe(res => {
      this.customerId = <number><unknown>res.get('id');
      console.log(res.get('id'));
    });  
  }

  private checkSelectedSubMenu() {
    this.isOnDetailsSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.DETAILS;
    this.isOnTasksSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.TASKS;
    this.isOnPreferencesSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.PREFERENCES;
    this.isOnPropertiesSubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.PROPERTIES;
    this.isOnHistorySubMenu = this.selectedCustomerSubMenu == Enum_CustomerSubMenu.HISTORY;
  }
}
