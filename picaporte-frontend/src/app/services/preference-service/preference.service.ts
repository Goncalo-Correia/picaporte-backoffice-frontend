import { Injectable } from '@angular/core';
import { PreferenceStructure } from 'src/app/structures/preference.structure';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  preferenceStructure: PreferenceStructure = new PreferenceStructure();
  preferenceStructureArray: Set<PreferenceStructure> = new Set<PreferenceStructure>();

  constructor() { }

  mapNewPreferenceStructure(preferenceStructure: PreferenceStructure): PreferenceStructure {
    this.preferenceStructure = new PreferenceStructure();

    this.preferenceStructure.preference.id = preferenceStructure.preference.id;
    this.preferenceStructure.preference.minPrice = preferenceStructure.preference.minPrice;
    this.preferenceStructure.preference.maxPrice = preferenceStructure.preference.maxPrice;
    this.preferenceStructure.preference.numBathrooms = preferenceStructure.preference.numBathrooms;
    this.preferenceStructure.preference.constructionYear = preferenceStructure.preference.constructionYear;

    this.preferenceStructure.preference.propertyStatusId = preferenceStructure.preference.propertyStatusId;
    this.preferenceStructure.preference.propertyLocationTypeId = preferenceStructure.preference.propertyLocationTypeId;
    this.preferenceStructure.preference.propertyConditionStatusId = preferenceStructure.preference.propertyConditionStatusId;
    this.preferenceStructure.preference.energyCertificateId = preferenceStructure.preference.energyCertificateId;
    
    this.preferenceStructure.preference.propertyStatus = preferenceStructure.preference.propertyStatus;
    this.preferenceStructure.preference.propertyLocationType = preferenceStructure.preference.propertyLocationType;
    this.preferenceStructure.preference.propertyConditionStatus = preferenceStructure.preference.propertyConditionStatus;
    this.preferenceStructure.preference.energyCertificate = preferenceStructure.preference.energyCertificate;

    //this.preferenceStructure.preference.ameneties = preferenceStructure.preference.ameneties;

    this.preferenceStructure.propertyTypes = preferenceStructure.propertyTypes;
    this.preferenceStructure.propertyTypologies = preferenceStructure.propertyTypologies;
    this.preferenceStructure.ameneties = preferenceStructure.ameneties;

    return this.preferenceStructure;
  }

}
