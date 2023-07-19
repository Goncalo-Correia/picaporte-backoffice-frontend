import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StaticIslandService } from 'src/app/api-service/static_island/static-island.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { Address } from 'src/app/models/address.model';
import { Static_Island } from 'src/app/models/static/static-island.model';
import { AddressValidationObject } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() address: Address = new Address();
  @Input() isEditable: boolean = false;
  @Input() isCustomer: boolean = false;
  @Input() addressValidationObject: AddressValidationObject = new AddressValidationObject();

  @Output() event_updateAddress = new EventEmitter<Address>();

  islands: Array<Static_Island> = new Array<Static_Island>();

  constructor(
    private authenticationService: AuthenticationService,
    private staticIslandService: StaticIslandService
  ) {
  }

  ngOnInit(): void {
    this.get_islands();
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

  onClick_selectIsland(island: Static_Island) {
    this.address.island = island;
    this.address.islandId = island.id;
    this.triggerEvent_updateAddress();
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

  private get_islands() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticIslandService.GetAll_Islands(resolve)
      .subscribe(data => {
        this.islands = <Static_Island[]>data;
      });
    });
  }
}