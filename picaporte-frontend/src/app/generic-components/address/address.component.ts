import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { AddressValidationObject } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  @Input() address: Address = new Address();
  @Input() isEditable: boolean = false;
  @Input() isCustomer: boolean = false;
  @Input() addressValidationObject: AddressValidationObject = new AddressValidationObject();

  @Output() event_updateAddress = new EventEmitter<Address>();

  constructor() {
  }

  onFocus_street() {
    this.addressValidationObject.isStreetValid.isValid = true;
  }
 
  onFocus_parish() {
    this.addressValidationObject.isParishValid.isValid = true;
  }

  onFocus_city() {
    this.addressValidationObject.isCityValid.isValid = true;
  }

  onFocus_island() {
    this.addressValidationObject.isIslandValid.isValid = true;
  }

  eventHandler_latitude(latitude: number) {
    this.address.latitude = latitude;
    this.triggerEvent_updateAddress();
  }

  eventHandler_longitude(longitude: number) {
    this.address.longitude = longitude;
    this.triggerEvent_updateAddress();
  }

  triggerEvent_updateAddress() {
    this.event_updateAddress.emit(this.address);
  }
}