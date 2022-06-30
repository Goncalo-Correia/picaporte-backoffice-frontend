import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueriesPropertyService } from 'src/app/api-service/queries-property/queries-property.service';
import { Address } from 'src/app/models/address.model';
import { Property } from 'src/app/models/property.model';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { AmenetieTypeStructure } from 'src/app/structures/amenetie-type.structure';
import { DocumentStructure } from 'src/app/structures/document.structure';
import { PropertyStructure } from 'src/app/structures/main-structures/property.structure';
import { Enum_PropertySubMenu, PropertySubMenu, PropertySubMenuFactory } from 'src/app/submenus/property.submenu';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private propertyId: number = 0;

  isEditable: boolean = false;
  isLoading: boolean = false;
  isDataFetched: boolean = false;

  propertyStructure: PropertyStructure;
  propertySubmenus: Array<PropertySubMenu>;
  selectedPropertySubMenu: Enum_PropertySubMenu = Enum_PropertySubMenu.DETAILS;

  isOnDetailsSubMenu: boolean = true;
  isOnTasksSubMenu: boolean = false;
  isOnCaracteristicsSubMenu: boolean = false;
  isOnDocumentsSubMenu: boolean = false;
  isOnImagesSubMenu: boolean = false;
  isOnRentingSubMenu: boolean = false;
  isOnLocationSubMenu: boolean = false;
  isOnObservationHistorySubMenu: boolean = false;
  isOnHistorySubMenu: boolean = false;
  
  private propertySubmenuFactory: PropertySubMenuFactory;

  constructor(public queries_propertyService: QueriesPropertyService, private activeRoute: ActivatedRoute) {
    this.propertyStructure = new PropertyStructure();
    this.propertySubmenus = new Array<PropertySubMenu>();
    this.propertySubmenuFactory = new PropertySubMenuFactory();
  }
  
  ngOnInit(): void {
    this.getActiveRoute();
    this.get_propertySubmenus();
    this.get_propertyStructure();
  }

  onClick_edit() {
    this.isEditable = true;
  }

  onClick_cancel() {
    this.isEditable = false;
    this.get_propertyStructure();
  }

  onClick_submit() {
    this.isEditable = false;
    this.submit_property();
  }

  onClick_selectSubMenu(enum_selectedCustomerSubMenu: Enum_PropertySubMenu | undefined) {
    if (enum_selectedCustomerSubMenu != undefined) {
      this.selectedPropertySubMenu = enum_selectedCustomerSubMenu;
    }
    this.checkSelectedSubMenu();
  }

  eventHandler_updatePropertyOnline(data: boolean) {
    this.propertyStructure.property.isOnline = data;
  }

  eventHandler_updatePropertyDetails(data: any) {
    this.propertyStructure.property = data;
  }

  eventHandler_updatePropertyAddress(data: Address) {
    this.propertyStructure.property.address = data;
  }

  eventHandler_updatePropertyCaracteristics(data: Array<AmenetieTypeStructure>) {
    this.propertyStructure.ameneties = data;
  }

  eventHandler_updateMainPropertyDocuments(data: Array<DocumentStructure>) {
    this.propertyStructure.mainDocuments = data;
  }

  eventHandler_updateCertificatePropertyDocuments(data: Array<DocumentStructure>) {
    this.propertyStructure.certificateDocuments = data;
  }

  eventHandler_updateOtherPropertyDocuments(data: Array<DocumentStructure>) {
    this.propertyStructure.otherDocuments = data;
  }

  eventHandler_updatePropertyMainImage(data: any) {

  }

  eventHandler_updatePropertyOtherImages(data: any) {

  }

  eventHandler_updatePropertyRenting(data: any) {

  }

  eventHandler_updatePropertyLocation(data: any) {

  }

  eventHandler_updatePropertyObservationHistory(data: any) {
    
  }

  private submit_property() {
    this.isLoading = true;

    if (this.propertyStructure.property.id == 0) {
      this.queries_propertyService.Post_PropertyStructure(this.propertyStructure).subscribe((data: {}) => {
        this.propertyStructure = <PropertyStructure>data;
        this.propertyId = this.propertyStructure.property.id;
        this.get_propertyStructure();
      });
    } else {
      this.queries_propertyService.Put_PropertyStructure(this.propertyId, this.propertyStructure).subscribe((data: {}) => {
        this.get_propertyStructure();
      });
    }
  }

  private get_propertyStructure() {
    this.isLoading = true;
    this.queries_propertyService.Get_PropertyStructure(this.propertyId).subscribe((data: {}) => {
      this.propertyStructure = <PropertyStructure>data;
      this.isDataFetched = true;
      this.isLoading = false;
    });;
  }

  private get_propertySubmenus() {
    this.propertySubmenus = this.propertySubmenuFactory.getPropertySubmenus();
  }

  private getActiveRoute() {
    this.activeRoute.paramMap.subscribe(res => {
      this.propertyId = <number><unknown>res.get('id');
    });  
  }

  private checkSelectedSubMenu() {
    this.isOnDetailsSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.DETAILS;
    this.isOnTasksSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.TASKS;
    this.isOnCaracteristicsSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.CARACTERISTICS;
    this.isOnDocumentsSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.DOCUMENTS;
    this.isOnImagesSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.IMAGES;
    this.isOnRentingSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.RENTING;
    this.isOnLocationSubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.LOCATION;
    this.isOnObservationHistorySubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.OBSERVATION_HISTORY;
    this.isOnHistorySubMenu = this.selectedPropertySubMenu == Enum_PropertySubMenu.HISTORY;
  }

}
