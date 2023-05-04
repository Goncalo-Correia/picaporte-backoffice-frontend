import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { catchError, Subscription } from 'rxjs';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';

@Component({
  selector: 'app-static-data',
  templateUrl: './static-data.component.html',
  styleUrls: ['./static-data.component.css']
})
export class StaticDataComponent implements OnInit, OnDestroy {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  subscription = new Subscription();
  isDataFetched: boolean = false;
  isEditable: boolean = false;
  isToDelete: boolean = false;
  isToDisplayRemoved: boolean = false;
  hasSortChanges: boolean = false;
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
    private dragulaService: DragulaService,
    private authenticationService: AuthenticationService
  ) {
    dragulaService.createGroup("STATIC_DATA", {});

    this.subscription.add(this.dragulaService.drop("STATIC_DATA").subscribe(() => {
      this.hasSortChanges = true;
    }));
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dragulaService.destroy("STATIC_DATA");
  }

  onClick_selectStaticDataType(staticDataType: Enum_StaticData) {
    this.isDataFetched = false;
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

    this.onClick_edit(this.staticDataStructureList[index], id == 0);
  }

  onClick_checkPrimaryDocument() {
    this.selectedStaticDataStructure.isPrimary = !this.selectedStaticDataStructure.isPrimary;
  }

  onClick_checkCertificateDocument() {
    this.selectedStaticDataStructure.isCertificate = !this.selectedStaticDataStructure.isCertificate;
  }

  onClick_displayRemoved() {
    this.isToDisplayRemoved = !this.isToDisplayRemoved;
  }

  onClick_add() {
    this.selectedStaticDataStructure = new StaticDataStructure();
    this.selectedStaticDataStructure.isActive = true;
    this.staticDataStructureList.push(this.selectedStaticDataStructure);

    this.isEditable = true;
    this.selectedRowNumber = this.staticDataStructureList.length - 1;
    
    setTimeout(() => {
      let element: HTMLElement = document.getElementsByClassName('accordion-button')[this.selectedRowNumber] as HTMLElement;
      element.click();
    }, 50);
  }

  onClick_edit(staticDataItem: StaticDataStructure, isNew: boolean) {
    this.selectedStaticDataStructure = new StaticDataStructure();
    this.selectedStaticDataStructure.id = staticDataItem.id;
    this.selectedStaticDataStructure.description = staticDataItem.description;
    this.selectedStaticDataStructure.label = staticDataItem.label;
    this.selectedStaticDataStructure.order = staticDataItem.order;
    this.selectedStaticDataStructure.isCertificate = staticDataItem.isCertificate;
    this.selectedStaticDataStructure.isPrimary = staticDataItem.isPrimary;
    this.selectedStaticDataStructure.isActive = staticDataItem.isActive;
    this.selectedStaticDataStructure.icon = staticDataItem.icon;
    if (isNew) {
      this.isEditable = true;
      this.isToDelete = false;
    } else {
      this.isEditable = false;
      this.isToDelete = false;
    }
  }

  onClick_selectIcon(icon: string) {
    this.selectedStaticDataStructure.icon = icon;
  }

  onClick_cancel() {
    this.selectedStaticDataStructure = new StaticDataStructure();
    if (this.selectedStaticDataStructure.id == 0) {
      this.staticDataStructureList.slice(this.staticDataStructureList.length - 1, 0);
    }
    this.isDataFetched = false;
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
    this.isDataFetched = false;
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
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyStatusService.Post_PropertyStatus(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyStatusService.Put_PropertyStatus(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyTypeService.Post_PropertyType(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyTypeService.Put_PropertyType(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyConditionStatusService.Post_PropertyConditionStatus(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyConditionStatusService.Put_PropertyConditionStatus(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyTypologyService.Post_PropertyTypologies(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticPropertyTypologyService.Put_PropertyTypology(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticEnergyCertificateService.Post_EnergyCertificate(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticEnergyCertificateService.Put_EnergyCertificate(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          }); 
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticAmenetieTypeService.Post_AmenetieType(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticAmenetieTypeService.Put_AmenetieType(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          }); 
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticDocumentStatusService.Post_DocumentStatus(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      } else {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          this.staticDocumentStatusService.Put_DocumentStatus(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      }
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      if (this.selectedStaticDataStructure.id == 0) {
        this.authenticationService.authorizeUser().then((resolve:any) => { 
          
          this.staticDocumentTypeService.Post_DocumentType(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
            )
            .subscribe(data => {
              this.fetchData();
            });
          });
        } else {
          this.authenticationService.authorizeUser().then((resolve:any) => { 
          console.log(this.selectedStaticDataStructure);
          this.staticDocumentTypeService.Put_DocumentType(this.selectedStaticDataStructure, resolve)
          .pipe(
            catchError(err => {
              this.messageComponent.showMessage(err.error);
              return err;
            })
          )
          .subscribe(data => {
            this.fetchData();
          });
        });
      }
    }
  }

  private deleteData() {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyStatusService.Delete_PropertyStatus(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyTypeService.Delete_PropertyType(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyConditionStatusService.Delete_PropertyConditionStatus(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyTypologyService.Delete_PropertyTypology(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticEnergyCertificateService.Delete_EnergyCertificate(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticAmenetieTypeService.Delete_AmenetieType(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticDocumentStatusService.Delete_DocumentStatus(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticDocumentTypeService.Delete_DocumentType(this.selectedStaticDataStructure.id, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
  } 

  private fetchData() {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyStatusService.GetAll_PropertyStatuses(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyTypeService.GetAll_PropertyTypes(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyConditionStatusService.GetAll_PropertyConditionStatuses(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyTypologyService.GetAll_PropertyTypology(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticEnergyCertificateService.GetAll_EnergyCertificates(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticAmenetieTypeService.GetAll_AmenetieTypes(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticDocumentStatusService.GetAll_DocumentStatus(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticDocumentTypeService.GetAll_DocumentTypes(false, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.staticDataStructureList = <Array<StaticDataStructure>>data;
          this.isDataFetched = true;
        });
      });
    }
  }

  onClick_saveOrder() {
    this.isDataFetched = false;
    this.hasSortChanges = false;
    var array = this.staticDataStructureList.filter(prop => prop.id != 0);
    this.saveItemData(array);
  }

  private saveItemData(item: Array<StaticDataStructure>) {
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyStatusService.Put_PropertyStatuses(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyTypeService.Put_PropertyTypes(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_CONDITION_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyConditionStatusService.Put_PropertyConditionStatuses(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_TYPOLOGY) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticPropertyTypologyService.Put_PropertyTypologies(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.PROPERTY_ENERGY_CERTIFICATE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticEnergyCertificateService.Put_EnergyCertificates(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.AMENETIE_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticAmenetieTypeService.Put_AmenetieTypes(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_STATUS) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticDocumentStatusService.Put_DocumentStatuses(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
      });
    }
    if (this.selectedStaticDataEnum == Enum_StaticData.DOCUMENT_TYPE) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.staticDocumentTypeService.Put_DocumentTypes(item, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.fetchData();
        });
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
