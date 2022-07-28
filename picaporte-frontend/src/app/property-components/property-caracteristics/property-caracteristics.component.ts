import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { AmenetieTypeStructure } from 'src/app/structures/amenetie-type.structure';

@Component({
  selector: 'app-property-caracteristics',
  templateUrl: './property-caracteristics.component.html',
  styleUrls: ['./property-caracteristics.component.css']
})
export class PropertyCaracteristicsComponent implements OnInit {

  @Input() ameneties: Array<AmenetieTypeStructure> = new Array<AmenetieTypeStructure>();
  @Input() isEditable: boolean = false;

  @Output() event_updatePropertyCaracteristics = new EventEmitter<Array<AmenetieTypeStructure>>();

  constructor(public amenetieTypeService: StaticAmenetieTypeService) {}

  ngOnInit(): void {
    
  }

  onClick_checkbox(index: number) {
    this.ameneties[index].isSelected = !this.ameneties[index].isSelected;
    this.triggerEvent_updatePropertyCaracteristics();
  }

  triggerEvent_updatePropertyCaracteristics() {
    console.log(this.ameneties);
    
    this.event_updatePropertyCaracteristics.emit(this.ameneties);
  }
}

