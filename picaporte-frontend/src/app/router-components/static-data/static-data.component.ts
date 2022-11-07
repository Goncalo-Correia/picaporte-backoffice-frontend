import { Component, OnDestroy, OnInit } from '@angular/core';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { StaticDocumentTypeService } from 'src/app/api-service/static-document-type/static-document-type.service';
import { StaticEnergyCertificateService } from 'src/app/api-service/static-energy-certificate/static-energy-certificate.service';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypeService } from 'src/app/api-service/static-property-type/static-property-type.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { StaticDocumentStatusService } from 'src/app/api-service/static-document-status/static-document-status.service';
import { StaticDataStructure } from 'src/app/structures/static-data.structure';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-static-data',
  templateUrl: './static-data.component.html',
  styleUrls: ['./static-data.component.css']
})
export class StaticDataComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  isEditable: boolean = false;
  isToDelete: boolean = false;
  selectedRowNumber: number = -1;
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
    private staticDocumentTypeService: StaticDocumentTypeService,
    private dragulaService: DragulaService
  ) {
    dragulaService.createGroup("STATIC_DATA", {});

    this.subscription.add(this.dragulaService.drop("STATIC_DATA").subscribe(() => {
      this.saveOrder();
    }));
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick_selectStaticDataType(staticDataType: Enum_StaticData) {
    this.selectedStaticDataStructure = new StaticDataStructure();
    this.selectedStaticDataEnum = staticDataType;
    this.selectedRowNumber = -1;
    this.fetchData();
  }

  onClick_selectStaticDataItem(id: number, index: number) {
    if (this.selectedRowNumber == index && this.selectedRowNumber != -1) {
      this.selectedRowNumber = -1;
    } else {
      this.selectedRowNumber = index;
    }

    if (id == 0) {
      this.onClick_edit(this.staticDataStructureList[index]);
    } else {
      this.isEditable = false;
      this.isToDelete = false;
    }
  }

  onClick_add() {
    this.selectedStaticDataStructure = new StaticDataStructure();
    this.staticDataStructureList.push(this.selectedStaticDataStructure);

    this.isEditable = true;
    this.selectedRowNumber = this.staticDataStructureList.length - 1;
    
    setTimeout(() => {
      let element: HTMLElement = document.getElementsByClassName('accordion-button')[this.selectedRowNumber] as HTMLElement;
      element.click();
    }, 50);
  }

  onClick_edit(staticDataItem: StaticDataStructure) {
    this.selectedStaticDataStructure = new StaticDataStructure();
    this.selectedStaticDataStructure.id = staticDataItem.id;
    this.selectedStaticDataStructure.description = staticDataItem.description;
    this.selectedStaticDataStructure.label = staticDataItem.label;
    this.selectedStaticDataStructure.order = staticDataItem.order;
    this.selectedStaticDataStructure.isCertificate = staticDataItem.isCertificate;
    this.selectedStaticDataStructure.isPrimary = staticDataItem.isPrimary;
    this.isEditable = true;
    this.isToDelete = false;
  }

  onClick_cancel() {
    this.selectedStaticDataStructure = new StaticDataStructure();
    if (this.selectedStaticDataStructure.id == 0) {
      this.staticDataStructureList.slice(this.staticDataStructureList.length - 1, 0);
    }
    this.isEditable = false;
    this.isToDelete = false;
    this.fetchData();
  }

  onClick_showDelete() {
    this.isToDelete = true;
  }

  onClick_delete(isConfirmed: boolean) {
    if (!isConfirmed) {
      this.isToDelete = false;
    } else {
      if (this.selectedStaticDataStructure.id == 0) {
        this.staticDataStructureList.slice(this.selectedRowNumber, 0);
      } else {
        this.deleteData();
      }
    }
  }

  onClick_submit() {
    this.isEditable = false;
    this.isToDelete = false;
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

  private deleteData() {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      this.staticPropertyStatusService.Delete_PropertyStatus(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      this.staticPropertyTypeService.Delete_PropertyType(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      this.staticPropertyConditionStatusService.Delete_PropertyConditionStatus(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      this.staticPropertyTypologyService.Delete_PropertyTypology(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      this.staticEnergyCertificateService.Delete_EnergyCertificate(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      this.staticAmenetieTypeService.Delete_AmenetieType(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      this.staticDocumentStatusService.Delete_DocumentStatus(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.staticDocumentTypeService.Delete_DocumentType(this.selectedStaticDataStructure.id).subscribe((data: {}) => {
        this.fetchData();
      });
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
      this.staticDocumentStatusService.GetAll_DocumentStatus().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.staticDocumentTypeService.GetAll_DocumentTypes().subscribe((data: {}) => {
        this.staticDataStructureList = <Array<StaticDataStructure>>data;
      });
    }
  }

  private saveOrder() {
    var array = this.staticDataStructureList.filter(prop => prop.id != 0);
    
    for (var i = 0; i < array.length; i++) {
      array[i].order = i;
      this.saveItemData(array[i], (i == array.length - 1));
    }
  }

  private saveItemData(item: StaticDataStructure, isLastIndex: boolean) {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      this.staticPropertyStatusService.Put_PropertyStatus(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      this.staticPropertyTypeService.Put_PropertyType(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      this.staticPropertyConditionStatusService.Put_PropertyConditionStatus(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      this.staticPropertyTypologyService.Put_PropertyTypology(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      this.staticEnergyCertificateService.Put_EnergyCertificate(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      this.staticAmenetieTypeService.Put_AmenetieType(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      this.staticDocumentStatusService.Put_DocumentStatus(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.staticDocumentTypeService.Put_DocumentType(item).subscribe((data: {}) => {
        if (isLastIndex) {
          this.fetchData();
        }
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
