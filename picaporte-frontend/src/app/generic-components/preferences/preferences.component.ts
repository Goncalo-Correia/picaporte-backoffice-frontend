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
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { Static_EnergyCertificate } from 'src/app/models/static/static-energycertificate.model';
import { StaticEnergyCertificateService } from 'src/app/api-service/static-energy-certificate/static-energy-certificate.service';
import { Static_PropertyConditionStatus } from 'src/app/models/static/static-propertyconditionstatus.model';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { Static_PropertyLocationType } from 'src/app/models/static/static-propertylocationtype.model';
import { StaticPropertyLocationTypeService } from 'src/app/api-service/static-property-location-type/property-location-type.service';
import { PropertyTypeSelection } from 'src/app/structures/utility-structures/property-type-selection.structure';
import { PropertyTypologySelection } from 'src/app/structures/utility-structures/property-typology-selection.structure copy';


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
  selectedPropertyTypeLabel: string = "Seleccione opção";
  selectedPropertyStatusLabel: string = "Seleccione opção";
  selectedPropertyLocationTypeLabel: string = "Seleccione opção";
  selectedPropertyConditionStatusLabel: string = "Seleccione opção";
  selectedPropertyTypologyLabel: string = "Seleccione opção";
  selectedEnergyCertificateLabel: string = "Seleccione opção";

  staticPropertyStatuses: Static_PropertyStatus[] = [];
  staticPropertyLocationTypes: Static_PropertyLocationType[] = [];
  staticPropertyConditionStatuses: Static_PropertyConditionStatus[] = [];
  staticEnergyCertificates: Static_EnergyCertificate[] = [];
  staticPropertyTypes: PropertyTypeSelection[] = [];
  staticPropertyTypologies: PropertyTypologySelection[] = [];

  amenetieTypeStructureList: Array<AmenetieTypeStructure>;
  private amenentieTypeStructure: AmenetieTypeStructure;
  private staticAmenetieType: Static_AmenetieType;

  constructor(
    public static_propertyTypeService: StaticPropertyTypeService, 
    public static_propertyStatusService: StaticPropertyStatusService, 
    public static_propertyLocationTypeService: StaticPropertyLocationTypeService, 
    public static_propertyConditionStatusService: StaticPropertyConditionStatusService, 
    public static_propertyTypologyService: StaticPropertyTypologyService,
    public static_energyCertificateService: StaticEnergyCertificateService,
    public preferenceService: PreferenceService,
    public amenetieTypeService: StaticAmenetieTypeService,
    private authenticationService: AuthenticationService
  ) { 
    this.selectedPreferenceStructure = new PreferenceStructure();
    this.amenetieTypeStructureList = new Array<AmenetieTypeStructure>();
    this.amenentieTypeStructure = new AmenetieTypeStructure();
    this.staticAmenetieType = new Static_AmenetieType();
  }

  ngOnInit(): void {
    this.get_staticPropertyTypes();
    this.get_staticPropertyStatuses();
    this.get_staticPropertyLocationTypes();
    this.get_staticPropertyConditionStatuses();
    this.get_staticPropertyTypologies();
    this.get_staticEnergyCertificates();
    this.get_amenetieTypes();
  }

  onClick_selectPropertyType(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.staticPropertyTypes[index].isSelected = !this.staticPropertyTypes[index].isSelected;
    this.buildPropertyTypes();
  }
  
  onClick_selectAllTypes(event: MouseEvent) {
    event.stopPropagation();
    this.staticPropertyTypes.forEach(element => {
      element.isSelected = true;
    })
    this.buildPropertyTypes();
  }

  onClick_clearTypes(event: MouseEvent) {
    event.stopPropagation();
    this.staticPropertyTypes.forEach(element => {
      element.isSelected = false;
    })
    this.buildPropertyTypes();
  }

  onClick_selectPropertyStatus(propertyStatus: Static_PropertyStatus, label: string) {
    this.selectedPreferenceStructure.preference.propertyStatusId = propertyStatus.id;
    this.selectedPreferenceStructure.preference.propertyStatus = propertyStatus;
    this.selectedPropertyStatusLabel = label;
  }

  onClick_selectPropertyLocationType(propertyLocationType: Static_PropertyLocationType, label: string) {
    this.selectedPreferenceStructure.preference.propertyLocationTypeId = propertyLocationType.id;
    this.selectedPreferenceStructure.preference.propertyLocationType = propertyLocationType;
    this.selectedPropertyLocationTypeLabel = label;
  }

  onClick_selectPropertyConditionStatus(propertyConditionStatus: Static_PropertyConditionStatus, label: string) {
    this.selectedPreferenceStructure.preference.propertyConditionStatusId = propertyConditionStatus.id;
    this.selectedPreferenceStructure.preference.propertyConditionStatus = propertyConditionStatus;
    this.selectedPropertyConditionStatusLabel = label;
  }

  onClick_selectPropertyTypology(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.staticPropertyTypologies[index].isSelected = !this.staticPropertyTypologies[index].isSelected;
    this.buildPropertyTypologies();
  }

  onClick_selectAllTypologies(event: MouseEvent) {
    event.stopPropagation();
    this.staticPropertyTypologies.forEach(element => {
      element.isSelected = true;
    });
    this.buildPropertyTypologies();
  }

  onClick_clearTypologies(event: MouseEvent) {
    event.stopPropagation();
    this.staticPropertyTypologies.forEach(element => {
      element.isSelected = false;
    });
    this.buildPropertyTypologies();
  }

  onClick_selectEnergyCertificate(energyCertificate: Static_EnergyCertificate, label: string) {
    this.selectedPreferenceStructure.preference.energyCertificateId = energyCertificate.id;
    this.selectedPreferenceStructure.preference.energyCertificate = energyCertificate;
    this.selectedEnergyCertificateLabel = label;
  }

  onClick_selectAllAmeneties(event: MouseEvent) {
    event.stopPropagation();
    this.amenetieTypeStructureList.forEach(element => {
      element.isSelected = true;
    });
  }

  onClick_clearAmenneties(event: MouseEvent) {
    event.stopPropagation();
    this.amenetieTypeStructureList.forEach(element => {
      element.isSelected = false;
    });
  }

  onClick_close() {
    this.selectedPropertyTypeLabel = "Seleccione opção";
    this.selectedPropertyStatusLabel = "Seleccione opção";
    this.selectedPropertyLocationTypeLabel = "Seleccione opção";
    this.selectedPropertyConditionStatusLabel = "Seleccione opção";
    this.selectedPropertyTypologyLabel = "Seleccione opção";
    this.selectedEnergyCertificateLabel = "Seleccione opção";
  }

  onClick_addNew() {
    this.selectedRowNumber = -1;
    this.selectedPreferenceStructure = new PreferenceStructure();
    this.buildAmenetieTypes();
  }

  onClick_edit(rowNumber: number) {
    
    if (this.isEditable) {
      this.selectedRowNumber = rowNumber;
      this.selectedPreferenceStructure = this.preferenceService.mapNewPreferenceStructure(this.preferences[rowNumber]);
      this.initAmenetieTypes();
      this.initPropertyTypes();
      this.initPropertyTypologies();
  
      if (this.selectedPreferenceStructure.propertyTypes.length > 0) {
        this.selectedPropertyTypeLabel = this.selectedPreferenceStructure.propertyTypes.length + (this.selectedPreferenceStructure.propertyTypes.length > 1 ? " tipos seleccionados" : " tipo seleccionado");
      }
      if (this.selectedPreferenceStructure.preference.propertyStatus != null) {
        this.selectedPropertyStatusLabel = this.selectedPreferenceStructure.preference.propertyStatus?.label;
      }
      if (this.selectedPreferenceStructure.preference.propertyLocationType != null) {
        this.selectedPropertyLocationTypeLabel = this.selectedPreferenceStructure.preference.propertyLocationType?.label;
      }
      if (this.selectedPreferenceStructure.preference.propertyConditionStatus != null) {
        this.selectedPropertyConditionStatusLabel = this.selectedPreferenceStructure.preference.propertyConditionStatus?.label;
      }
      if (this.selectedPreferenceStructure.propertyTypologies.length > 0) {
        this.selectedPropertyTypologyLabel = this.selectedPreferenceStructure.propertyTypes.length + (this.selectedPreferenceStructure.propertyTypologies.length > 1 ? " tipologias seleccionadas" : " tipologia seleccionada");
      }
      if (this.selectedPreferenceStructure.preference.energyCertificate != null) {
        this.selectedEnergyCertificateLabel = this.selectedPreferenceStructure.preference.energyCertificate?.label;
      }
    }
  }

  onClick_submit() {
    this.buildAmenetieTypes();
    this.buildPropertyTypes();
    this.buildPropertyTypologies();

    if (this.selectedRowNumber == -1) {
      this.preferences.push(this.selectedPreferenceStructure);
    } else {
      this.preferences[this.selectedRowNumber] = this.selectedPreferenceStructure;
    }

    console.log(this.selectedPreferenceStructure);
    console.log(this.preferences);
    
    
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

  private buildPropertyTypes() {
    this.selectedPreferenceStructure.propertyTypes = new Array<Static_PropertyType>();
    this.staticPropertyTypes.filter(prop => prop.isSelected).forEach(element => {
      this.selectedPreferenceStructure.propertyTypes.push(element.propertyType);
    });

    if (this.selectedPreferenceStructure.propertyTypes.length > 0) {
      this.selectedPropertyTypeLabel = this.selectedPreferenceStructure.propertyTypes.length + (this.selectedPreferenceStructure.propertyTypes.length > 1 ? " tipos seleccionados" : " tipo seleccionado");
    } else {
      this.selectedPropertyTypeLabel = "Seleccione opção";
    }
  }

  private initPropertyTypes() {
    for (let index = 0; index < this.selectedPreferenceStructure.propertyTypes.length; index++) {
      if (this.selectedPreferenceStructure.propertyTypes.findIndex(prop => prop.id == this.staticPropertyTypes[index].propertyType.id) == -1) {
        this.staticPropertyTypes[index].isSelected = false;
      } else {
        this.staticPropertyTypes[index].isSelected = true;
      }
    }
  }

  private buildPropertyTypologies() {
    this.selectedPreferenceStructure.propertyTypologies = new Array<Static_PropertyTypology>();
    this.staticPropertyTypologies.filter(prop => prop.isSelected).forEach(element => {
      this.selectedPreferenceStructure.propertyTypologies.push(element.propertyTypology);
    });
    if (this.selectedPreferenceStructure.propertyTypologies.length > 0) {
      this.selectedPropertyTypologyLabel = this.selectedPreferenceStructure.propertyTypologies.length + (this.selectedPreferenceStructure.propertyTypologies.length > 1 ? " tipologias seleccionadas" : " tipologia seleccionada");
    } else {
      this.selectedPropertyTypologyLabel = "Seleccione opção";
    }
  }

  private initPropertyTypologies() {
    for (let index = 0; index < this.selectedPreferenceStructure.propertyTypologies.length; index++) {
      if (this.selectedPreferenceStructure.propertyTypologies.findIndex(prop => prop.id == this.staticPropertyTypologies[index].propertyTypology.id) == -1) {
        this.staticPropertyTypologies[index].isSelected = false;
      } else {
        this.staticPropertyTypologies[index].isSelected = true;
      }
    }
  }

  private buildAmenetieTypes() {
    this.selectedPreferenceStructure.ameneties = new Array<Static_AmenetieType>();
    this.amenetieTypeStructureList.filter(prop => prop.isSelected == true).forEach(element => {
      this.staticAmenetieType = new Static_AmenetieType();
      this.staticAmenetieType.id = element.amenetieType.id;
      this.staticAmenetieType.label = element.amenetieType.label;
      this.staticAmenetieType.description = element.amenetieType.description;
      this.staticAmenetieType.order = element.amenetieType.order;
      this.staticAmenetieType.icon = element.amenetieType.icon;
      this.selectedPreferenceStructure.ameneties.push(this.staticAmenetieType);
    })
  }

  private initAmenetieTypes() {
    for (let index = 0; index < this.amenetieTypeStructureList.length; index++) {
      if (this.selectedPreferenceStructure.ameneties.findIndex(prop => prop.id == this.amenetieTypeStructureList[index].amenetieType.id) == -1) {
        this.amenetieTypeStructureList[index].isSelected = false;
      } else {
        this.amenetieTypeStructureList[index].isSelected = true;
      }
    }
  }

  private get_staticPropertyTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyTypeService.GetAll_PropertyTypes(true, resolve).subscribe((data: {}) => {
        let propertyTypes: Array<Static_PropertyType> = new Array<Static_PropertyType>();
        propertyTypes = <Static_PropertyType[]>data;

        this.staticPropertyTypes = new Array<PropertyTypeSelection>();
        propertyTypes.forEach(element => {
          this.staticPropertyTypes.push({
            propertyType: element,
            isSelected: false
          });
        })
      });
    });
  }

  private get_staticPropertyStatuses() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyStatusService.GetAll_PropertyStatuses(true, resolve).subscribe((data: {}) => {
        this.staticPropertyStatuses = <Static_PropertyStatus[]>data;
        this.staticPropertyStatuses.push(new Static_PropertyStatus());
      });
    });
  }

  private get_staticPropertyLocationTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyLocationTypeService.GetAll_PropertyLocationTypes(true, resolve).subscribe((data: {}) => {
        this.staticPropertyLocationTypes = <Static_PropertyLocationType[]>data;
        this.staticPropertyLocationTypes.push(new Static_PropertyLocationType());
      });
    });
  }

  private get_staticPropertyTypologies() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyTypologyService.GetAll_PropertyTypology(true, resolve).subscribe((data: {}) => {
        let propertyTypologies: Array<Static_PropertyTypology> = new Array<Static_PropertyTypology>();
        propertyTypologies = <Static_PropertyType[]>data;

        this.staticPropertyTypologies = new Array<PropertyTypologySelection>();
        propertyTypologies.forEach(element => {
          this.staticPropertyTypologies.push({
            propertyTypology: element,
            isSelected: false
          });
        })
      });
    });
  }

  private get_staticPropertyConditionStatuses() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_propertyConditionStatusService.GetAll_PropertyConditionStatuses(true, resolve).subscribe((data: {}) => {
        this.staticPropertyConditionStatuses = <Static_PropertyConditionStatus[]>data;
        this.staticPropertyConditionStatuses.push(new Static_PropertyConditionStatus());
      });
    });
  }

  private get_staticEnergyCertificates() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.static_energyCertificateService.GetAll_EnergyCertificates(true, resolve).subscribe((data: {}) => {
        this.staticEnergyCertificates = <Static_EnergyCertificate[]>data;
        this.staticEnergyCertificates.push(new Static_EnergyCertificate());
      });
    });
  }

  private get_amenetieTypes() {
    this.amenetieTypeStructureList = new Array<AmenetieTypeStructure>();
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.amenetieTypeService.GetAll_AmenetieTypes(true, resolve).subscribe((data: {}) => {
        var localAmeneties = <Static_AmenetieType[]>data;
        localAmeneties.forEach(element => {
          this.amenentieTypeStructure = new AmenetieTypeStructure();
          this.amenentieTypeStructure.amenetieType = element;
          this.amenetieTypeStructureList.push(this.amenentieTypeStructure);
        });
      });
    });
  }
}
