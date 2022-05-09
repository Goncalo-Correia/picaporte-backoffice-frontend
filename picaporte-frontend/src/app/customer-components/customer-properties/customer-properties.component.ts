import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from 'src/app/models/property.model';

@Component({
  selector: 'app-customer-properties',
  templateUrl: './customer-properties.component.html',
  styleUrls: ['./customer-properties.component.css']
})
export class CustomerPropertiesComponent implements OnInit {

  @Input() properties: Array<Property> | undefined;

  @Output() event_updateCustomerProperties= new EventEmitter<Array<Property>>();

  constructor() { }

  ngOnInit(): void {
  }

  triggerEvent_updateCustomerProperties() {
    this.event_updateCustomerProperties.emit(this.properties);
  }

}
