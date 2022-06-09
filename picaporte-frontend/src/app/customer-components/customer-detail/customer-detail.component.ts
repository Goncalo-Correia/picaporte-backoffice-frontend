import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer = <Customer>{};
  @Input() isEditable: boolean = false;

  @Output() event_updateCustomerDetails = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit(): void {
  }

  triggerEvent_updateCustomerDetails() {
    this.event_updateCustomerDetails.emit(this.customer);
  }

}
