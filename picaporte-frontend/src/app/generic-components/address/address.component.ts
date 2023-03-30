import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  @Input() address: Address = new Address();
  @Input() isEditable: boolean = false;

  @Output() event_updateAddress = new EventEmitter<Address>();

  constructor() {
  }
  
  triggerEvent_updateAddress() {
    this.event_updateAddress.emit(this.address);
  }
}
