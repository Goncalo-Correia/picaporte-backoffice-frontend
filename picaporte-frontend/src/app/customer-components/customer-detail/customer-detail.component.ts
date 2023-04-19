import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerValidationObject } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer;
  @Input() isEditable: boolean = false;
  @Input() customerValidationObject: CustomerValidationObject = new CustomerValidationObject();

  @Output() event_updateCustomerDetails = new EventEmitter<Customer>();

  constructor() { 
    this.customer = new Customer();
  }

  ngOnInit(): void {
  }

  onFocus_name() {
    this.customerValidationObject.isNameValid.isValid = true;
  }

  onFocus_email() {
    this.customerValidationObject.isEmailValid.isValid = true;
  }

  onFocus_phoneNumber() {
    this.customerValidationObject.isPhoneNumberValid.isValid = true;
  }

  onFocus_cc() {
    this.customerValidationObject.isCcValid.isValid = true;
  }

  onFocus_nif() {
    this.customerValidationObject.isNifValid.isValid = true;
  }

  triggerEvent_updateCustomerDetails() {
    this.event_updateCustomerDetails.emit(this.customer);
  }
}
