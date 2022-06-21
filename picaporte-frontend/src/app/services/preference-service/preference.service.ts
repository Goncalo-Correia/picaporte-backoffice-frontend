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
    this.preferenceStructure.preference.propertyConditionStatusId = preferenceStructure.preference.propertyConditionStatusId;
    this.preferenceStructure.preference.propertyTypeId = preferenceStructure.preference.propertyTypeId;
    this.preferenceStructure.preference.propertyTypologyId = preferenceStructure.preference.propertyTypologyId;
    this.preferenceStructure.preference.energyCertificateId = preferenceStructure.preference.energyCertificateId;

    this.preferenceStructure.preference.propertyStatus = preferenceStructure.preference.propertyStatus;
    this.preferenceStructure.preference.propertyConditionStatus = preferenceStructure.preference.propertyConditionStatus;
    this.preferenceStructure.preference.propertyType = preferenceStructure.preference.propertyType;
    this.preferenceStructure.preference.propertyTypology = preferenceStructure.preference.propertyTypology;
    this.preferenceStructure.preference.energyCertificate = preferenceStructure.preference.energyCertificate;

    this.preferenceStructure.preference.ameneties = preferenceStructure.preference.ameneties;

    this.preferenceStructure.ameneties = preferenceStructure.ameneties;

    return this.preferenceStructure;
  }

}
