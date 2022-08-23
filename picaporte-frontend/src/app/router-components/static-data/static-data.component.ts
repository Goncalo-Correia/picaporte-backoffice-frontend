import { Component, OnInit } from '@angular/core';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { StaticDocumentTypeService } from 'src/app/api-service/static-document-type/static-document-type.service';
import { StaticEnergyCertificateService } from 'src/app/api-service/static-energy-certificate/static-energy-certificate.service';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypeService } from 'src/app/api-service/static-property-type/static-property-type.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { StaticDocumentStatusService } from 'src/app/api-service/static-document-status/static-document-status.service';
import { StaticDataStructure } from 'src/app/structures/static-data.structure';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';

@Component({
  selector: 'app-static-data',
  templateUrl: './static-data.component.html',
  styleUrls: ['./static-data.component.css']
})
export class StaticDataComponent implements OnInit {

  isEditable: boolean = false;
  selectedStaticDataEnum: Enum_StaticData = Enum_StaticData.PROPERTY_STATUS;
  staticDataStructureList: Array<StaticDataStructure> = new Array<StaticDataStructure>();
  selectedStaticDataStructure: StaticDataStructure = new StaticDataStructure();

  constructor(
    private staticPropertyStatusService: StaticPropertyStatusService,
    private staticPropertyTypeService: StaticPropertyTypeService,
    private staticPropertyConditionStatusService: StaticPropertyConditionStatusService,
    private staticPropertyTypologyService: StaticPropertyTypologyService,
    private staticEnergyCertificateService: StaticEnergyCertificateService,
    private staticAmenetieTypeService: StaticAmenetieTypeService,
    private staticDocumentStatusService: StaticDocumentStatusService,
    private staticDocumentTypeService: StaticDocumentTypeService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onClick_selectStaticDataType(staticDataType: Enum_StaticData) {

  }

  onClick_selectStaticDataItem(staticDataItem: StaticDataStructure) {
    this.selectedStaticDataStructure = staticDataItem;
    this.isEditable = false;
  }

  onClick_edit() {
    this.isEditable = true;
  }

  onClick_cancel() {
    this.selectedStaticDataStructure = new StaticDataStructure();
    this.isEditable = false;
    this.fetchData();
  }

  onClick_submit() {
    this.isEditable = false;
    this.saveData();
  }

  Enum_StaticData(): typeof Enum_StaticData {
    return Enum_StaticData; 
  }

  private saveData() {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticPropertyStatusService.Post_PropertyStatus(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticPropertyStatusService.Put_PropertyStatus(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticPropertyTypeService.Post_PropertyType(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticPropertyTypeService.Put_PropertyType(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticPropertyConditionStatusService.Post_PropertyConditionStatus(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticPropertyConditionStatusService.Put_PropertyConditionStatus(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticPropertyTypologyService.Post_PropertyTypologies(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticPropertyTypologyService.Put_PropertyTypology(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticEnergyCertificateService.Post_EnergyCertificate(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticEnergyCertificateService.Put_EnergyCertificate(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticAmenetieTypeService.Post_AmenetieType(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticAmenetieTypeService.Put_AmenetieType(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticDocumentStatusService.Post_DocumentStatus(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticDocumentStatusService.Put_DocumentStatus(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticDocumentTypeService.Post_DocumentType(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      } else {
        this.staticDocumentTypeService.Put_DocumentType(this.selectedStaticDataStructure).subscribe((data: {}) => {
          this.fetchData();
        });
      }
    }
  }

  private fetchData() {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      this.staticPropertyStatusService.GetAll_PropertyStatuses().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      this.staticPropertyTypeService.GetAll_PropertyTypes().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      this.staticPropertyConditionStatusService.GetAll_PropertyConditionStatuses().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      this.staticPropertyTypologyService.GetAll_PropertyTypology().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      this.staticEnergyCertificateService.GetAll_EnergyCertificates().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      this.staticAmenetieTypeService.GetAll_AmenetieTypes().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      this.staticDocumentTypeService.GetAll_DocumentTypes().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.staticDocumentTypeService.GetAll_DocumentTypes().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
  }

}

export enum Enum_StaticData {
  PROPERTY_STATUS,
  PROPERTY_TYPE,
  PROPERTY_CONDITION_STATUS,
  PROPERTY_TYPOLOGY,
  PROPERTY_ENERGY_CERTIFICATE,
  AMENETIE_TYPE,
  DOCUMENT_STATUS,
  DOCUMENT_TYPE
}
