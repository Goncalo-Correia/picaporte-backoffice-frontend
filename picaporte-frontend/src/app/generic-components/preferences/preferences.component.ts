import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PreferenceStructure } from 'src/app/structures/preference.structure';
import { StaticPropertyTypeService } from 'src/app/api-service/static-property-type/static-property-type.service';
import { Static_PropertyType } from 'src/app/models/static/static-propertytype.model';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { PreferenceService } from 'src/app/services/preference-service/preference.service';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class CustomerPreferencesComponent implements OnInit {



  @Input() preferences: Array<PreferenceStructure> = new Array<PreferenceStructure>();

  @Output() event_updatePreferences= new EventEmitter<Array<PreferenceStructure>>();

  selectedPreferenceStructure: PreferenceStructure;
  selectedRowNumber: number = -1;
  selectedPropertyTypeLabel: string = "Nenhuma opção seleccionada";
  selectedPropertyStatusLabel: string = "Nenhuma opção seleccionada";
  selectedPropertyTypologyLabel: string = "Nenhuma opção seleccionada";

  staticPropertyTypes: Static_PropertyType[] = [];
  staticPropertyStatuses: Static_PropertyStatus[] = [];
  staticPropertyTypologies: Static_PropertyTypology[] = [];

  constructor(
    public static_propertyTypeService: StaticPropertyTypeService, 
    public static_propertyStatusService: StaticPropertyStatusService, 
    public static_propertyTypologyService: StaticPropertyTypologyService,
    public preferenceService: PreferenceService) 
  { 
    this.selectedPreferenceStructure = new PreferenceStructure();
  }

  ngOnInit(): void {
    this.get_staticPropertyTypes();
    this.get_staticPropertyStatuses();
    this.get_staticPropertyTypologies();
  }

  onClick_selectPropertyType(propertyType: Static_PropertyType, label: string) {
    this.selectedPreferenceStructure.preference.propertyTypeId = propertyType.id;
    this.selectedPreferenceStructure.preference.propertyType = propertyType;
    this.selectedPropertyTypeLabel = label;
  }

  onClick_selectPropertyStatus(propertyStatus: Static_PropertyStatus, label: string) {
    this.selectedPreferenceStructure.preference.propertyStatusId = propertyStatus.id;
    this.selectedPreferenceStructure.preference.propertyStatus = propertyStatus;
    this.selectedPropertyStatusLabel = label;
  }

  onClick_selectPropertyTypology(propertyTypology: Static_PropertyTypology, label: string) {
    this.selectedPreferenceStructure.preference.propertyTypologyId = propertyTypology.id;
    this.selectedPreferenceStructure.preference.propertyTypology = propertyTypology;
    this.selectedPropertyTypologyLabel = label;
  }

  onClick_close() {
    this.selectedPropertyTypeLabel = "Nenhuma opção seleccionada";
    this.selectedPropertyStatusLabel = "Nenhuma opção seleccionada";
    this.selectedPropertyTypologyLabel = "Nenhuma opção seleccionada";
  }

  onClick_addNew() {
    this.selectedRowNumber = -1;
    this.selectedPreferenceStructure = new PreferenceStructure();
  }

  onClick_edit(rowNumber: number) {
    this.selectedRowNumber = rowNumber;
    this.selectedPreferenceStructure = this.preferenceService.mapNewPreferenceStructure(this.preferences[rowNumber]);

    this.selectedPropertyTypeLabel = this.selectedPreferenceStructure.preference.propertyType.label;
    this.selectedPropertyStatusLabel = this.selectedPreferenceStructure.preference.propertyStatus.label;
    this.selectedPropertyTypologyLabel = this.selectedPreferenceStructure.preference.propertyTypology.label;
  }

  onClick_submit() {
    if (this.selectedRowNumber == -1) {
      this.preferences.push(this.selectedPreferenceStructure);
    } else {
      this.preferences[this.selectedRowNumber] = this.selectedPreferenceStructure;
    }

    this.triggerEvent_updatePreferences();
  }

  onClick_remove(index: number) {
    this.preferences?.splice(index, 1);
    this.triggerEvent_updatePreferences();
  }

  triggerEvent_updatePreferences() {
    this.event_updatePreferences.emit(this.preferences);
  }

  private get_staticPropertyTypes() {
    this.static_propertyTypeService.GetAll_PropertyTypes().subscribe((data: {}) => {
      this.staticPropertyTypes = <Static_PropertyType[]>data;
    });;
  }

  private get_staticPropertyStatuses() {
    this.static_propertyStatusService.GetAll_PropertyStatuses().subscribe((data: {}) => {
      this.staticPropertyStatuses = <Static_PropertyStatus[]>data;
    });;
  }

  private get_staticPropertyTypologies() {
    this.static_propertyTypologyService.GetAll_PropertyTypologies().subscribe((data: {}) => {
      this.staticPropertyTypologies = <Static_PropertyTypology[]>data;
    });;
  }

}
