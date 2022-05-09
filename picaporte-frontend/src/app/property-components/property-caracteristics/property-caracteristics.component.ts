import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StaticAmenetieTypeServiceService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { AmenetieTypeStructure } from 'src/app/structures/amenetie-type.structure';

@Component({
  selector: 'app-property-caracteristics',
  templateUrl: './property-caracteristics.component.html',
  styleUrls: ['./property-caracteristics.component.css']
})
export class PropertyCaracteristicsComponent implements OnInit, AfterViewInit {

  private amenetieTypeStructure: AmenetieTypeStructure;
  private localAmeneties: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
  amenetieTypeStructureList: Array<AmenetieTypeStructure>;

  @Input() ameneties: Array<Static_AmenetieType>;

  @Output() event_updatePropertyCaracteristics = new EventEmitter<Array<Static_AmenetieType>>();

  constructor(public amenetieTypeService: StaticAmenetieTypeServiceService) {
    this.amenetieTypeStructureList = new Array<AmenetieTypeStructure>();
    this.ameneties = new Array<Static_AmenetieType>();
    this.localAmeneties = new Array<Static_AmenetieType>();
    this.amenetieTypeStructure = new AmenetieTypeStructure();
  }

  ngOnInit(): void {
    this.get_amenetieTypeStructureList();
  }

  ngAfterViewInit(): void {
    this.buildAmenetieTypeStructure();
  }

  onChange_checkbox(index: number) {
    this.amenetieTypeStructureList[index].isSelected = !this.amenetieTypeStructureList[index].isSelected;
    this.buildAmeneties();
    this.triggerEvent_updatePropertyCaracteristics();
  }

  triggerEvent_updatePropertyCaracteristics() {
    console.log(this.ameneties);
    
    this.event_updatePropertyCaracteristics.emit(this.ameneties);
  }

  private get_amenetieTypeStructureList() {
    this.amenetieTypeService.GetAll_AmenetieTypes().subscribe((data: {}) => {
      this.localAmeneties = <Static_AmenetieType[]>data;
      this.buildAmenetieTypeStructure();
    });;
  }

  private buildAmenetieTypeStructure() {
    this.amenetieTypeStructureList = new Array<AmenetieTypeStructure>();
    for (let i = 0; i < this.localAmeneties.length; i++) {
      this.amenetieTypeStructure = new AmenetieTypeStructure();
      if (this.ameneties.find(prop => prop.id == this.localAmeneties[i].id)?.id != 0) {
        this.amenetieTypeStructure.amenetie = this.localAmeneties[i];
        this.amenetieTypeStructure.isSelected = true;
      } else {
        this.amenetieTypeStructure.amenetie = this.localAmeneties[i];
        this.amenetieTypeStructure.isSelected = false;
      }
      this.amenetieTypeStructureList.push(this.amenetieTypeStructure);
    }
  }

  private buildAmeneties() {
    this.ameneties = new Array<Static_AmenetieType>();
    for (let i = 0; i < this.amenetieTypeStructureList.length; i++) {
      if (this.amenetieTypeStructureList[i].isSelected) {
        this.ameneties.push(this.amenetieTypeStructureList[i].amenetie);
      }
    }
  }
}

