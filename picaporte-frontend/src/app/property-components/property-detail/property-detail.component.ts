import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from 'src/app/models/property.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  @Input() property: Property = <Property>{};

  @Output() event_updateCPropertyDetails = new EventEmitter<Property>();

  constructor() { }

  ngOnInit(): void {
  }

  triggerEvent_updatePropertyDetails() {
    this.event_updateCPropertyDetails.emit(this.property);
  }

}
