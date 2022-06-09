import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PreferenceStructure } from 'src/app/structures/preference.structure';
import { StaticPropertyTypeService } from 'src/app/api-service/static-property-type/static-property-type.service';
import { Static_PropertyType } from 'src/app/models/static/static-propertytype.model';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { PreferenceService } from 'src/app/services/preference-service/preference.service';
import { AmenetieTypeStructure } from 'src/app/structures/amenetie-type.structure';
import { StaticAmenetieTypeServiceService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { Static_EnergyCertificate } from 'src/app/models/static/static-energycertificate.model';
import { StaticEnergyCertificateService } from 'src/app/api-service/static-energy-certificate/static-energy-certificate.service';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class CustomerPreferencesComponent implements OnInit {

  @Input() preferences: Array<PreferenceStructure> = new Array<PreferenceStructure>();
  @Input() isEditable: boolean = false;

  @Output() event_updatePreferences= new EventEmitter<Array<PreferenceStructure>>();

  selectedPreferenceStructure: PreferenceStructure;
  selectedRowNumber: number = -1;
  selectedPropertyTypeLabel: string = "Nenhuma opção seleccionada";
  selectedPropertyStatusLabel: string = "Nenhuma opção seleccionada";
  selectedPropertyTypologyLabel: string = "Nenhuma opção seleccionada";
  selectedEnergyCertificateLabel: string = "Nenhuma opção seleccionada";

  staticPropertyTypes: Static_PropertyType[] = [];
  staticPropertyStatuses: Static_PropertyStatus[] = [];
  staticPropertyTypologies: Static_PropertyTypology[] = [];
  staticEnergyCertificates: Static_EnergyCertificate[] = [];

  amenetieTypeStructureList: Array<AmenetieTypeStructure>;
  private amenentieTypeStructure: AmenetieTypeStructure;
  private staticAmenetieType: Static_AmenetieType;

  constructor(
    public static_propertyTypeService: StaticPropertyTypeService, 
    public static_propertyStatusService: StaticPropertyStatusService, 
    public static_propertyTypologyService: StaticPropertyTypologyService,
    public static_energyCertificateService: StaticEnergyCertificateService,
    public preferenceService: PreferenceService,
    public amenetieTypeService: StaticAmenetieTypeServiceService) 
  { 
    this.selectedPreferenceStructure = new PreferenceStructure();
    this.amenetieTypeStructureList = new Array<AmenetieTypeStructure>();
    this.amenentieTypeStructure = new AmenetieTypeStructure();
    this.staticAmenetieType = new Static_AmenetieType();
  }

  ngOnInit(): void {
    this.get_staticPropertyTypes();
    this.get_staticPropertyStatuses();
    this.get_staticPropertyTypologies();
    this.get_staticEnergyCertificates();
    this.get_amenetieTypes();
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

  onClick_selectEnergyCertificate(energyCertificate: Static_EnergyCertificate, label: string) {
    this.selectedPreferenceStructure.preference.energyCertificateId = energyCertificate.id;
    this.selectedPreferenceStructure.preference.energyCertificate = energyCertificate;
    this.selectedEnergyCertificateLabel = label;
  }

  onClick_close() {
    this.selectedPropertyTypeLabel = "Nenhuma opção seleccionada";
    this.selectedPropertyStatusLabel = "Nenhuma opção seleccionada";
    this.selectedPropertyTypologyLabel = "Nenhuma opção seleccionada";
    this.selectedEnergyCertificateLabel = "Nenhuma opção seleccionada";
  }

  onClick_addNew() {
    this.selectedRowNumber = -1;
    this.selectedPreferenceStructure = new PreferenceStructure();
    this.buildAmenetieTypeStructure(false);
  }

  onClick_edit(rowNumber: number) {
    if (this.isEditable) {
      this.selectedRowNumber = rowNumber;
      this.selectedPreferenceStructure = this.preferenceService.mapNewPreferenceStructure(this.preferences[rowNumber]);
      this.buildAmenetieTypeStructure(false);
  
      if (this.selectedPreferenceStructure.preference.propertyType != null) {
        this.selectedPropertyTypeLabel = this.selectedPreferenceStructure.preference.propertyType.label;
      }
      if (this.selectedPreferenceStructure.preference.propertyStatus != null) {
        this.selectedPropertyStatusLabel = this.selectedPreferenceStructure.preference.propertyStatus?.label;
      }
      if (this.selectedPreferenceStructure.preference.propertyTypology != null) {
        this.selectedPropertyTypologyLabel = this.selectedPreferenceStructure.preference.propertyTypology?.label;
      }
      if (this.selectedPreferenceStructure.preference.energyCertificate != null) {
        this.selectedEnergyCertificateLabel = this.selectedPreferenceStructure.preference.energyCertificate?.label;
      }
    }
  }

  onClick_submit() {
    this.buildAmenetieTypeStructure(true);
    if (this.selectedRowNumber == -1) {
      this.preferences.push(this.selectedPreferenceStructure);
    } else {
      this.preferences[this.selectedRowNumber] = this.selectedPreferenceStructure;
    }
    this.onClick_close();
    this.triggerEvent_updatePreferences();
  }

  onClick_remove(index: number) {
    this.preferences?.splice(index, 1);
    this.triggerEvent_updatePreferences();
  }

  onChange_checkbox(index: number) {
    this.amenetieTypeStructureList[index].isSelected = !this.amenetieTypeStructureList[index].isSelected;
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

  private get_staticEnergyCertificates() {
    this.static_energyCertificateService.GetAll_EnergyCertificates().subscribe((data: {}) => {
      this.staticEnergyCertificates = <Static_EnergyCertificate[]>data;
    });;
  }

  private get_amenetieTypes() {
    this.amenetieTypeStructureList = new Array<AmenetieTypeStructure>();
    this.amenetieTypeService.GetAll_AmenetieTypes().subscribe((data: {}) => {
      var localAmeneties = <Static_AmenetieType[]>data;
      localAmeneties.forEach(element => {
        this.amenentieTypeStructure = new AmenetieTypeStructure();
        this.amenentieTypeStructure.amenetie = element;
        this.amenetieTypeStructureList.push(this.amenentieTypeStructure);
      });
    });;
  }

  private buildAmenetieTypeStructure(isSubmit: boolean) {
    if (isSubmit) {
      this.selectedPreferenceStructure.ameneties = new Array<Static_AmenetieType>();
      this.amenetieTypeStructureList.filter(prop => prop.isSelected == true).forEach(element => {
        this.staticAmenetieType = new Static_AmenetieType();
        this.staticAmenetieType.id = element.amenetie.id;
        this.staticAmenetieType.label = element.amenetie.label;
        this.staticAmenetieType.description = element.amenetie.description;
        this.staticAmenetieType.order = element.amenetie.order;
        this.selectedPreferenceStructure.ameneties.push(this.staticAmenetieType);
      })
    } else {
      for (let index = 0; index < this.amenetieTypeStructureList.length; index++) {
        if (this.selectedPreferenceStructure.ameneties.findIndex(prop => prop.id == this.amenetieTypeStructureList[index].amenetie.id) == -1) {
          this.amenetieTypeStructureList[index].isSelected = false;
        } else {
          this.amenetieTypeStructureList[index].isSelected = true;
        }
      }
    }
  }

}
