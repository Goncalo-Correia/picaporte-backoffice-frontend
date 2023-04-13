import { Static_AmenetieType } from "./static/static-amenetieType.model";
import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyConditionStatus } from "./static/static-propertyconditionstatus.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";
import { Static_PropertyType } from "./static/static-propertytype.model";
import { Static_PropertyTypology } from "./static/static-propertytypology.model";

export class Preference {
    public id: number = 0;
    public minPrice: number = 0;
    public maxPrice: number = 0;
    public numBathrooms: number = 0;
    public constructionYear: number = 0;
    public minLivingArea: number = 0;
    public maxLivingArea: number = 0;
    public minTotalArea: number = 0;
    public maxTotalArea: number = 0;
    
    public propertyTypeId: number = 0;
    public propertyStatusId: number = 0;
    public propertyConditionStatusId: number = 0;
    public propertyTypologyId: number = 0;
    public energyCertificateId: number = 0;

    public propertyType: Static_PropertyType = new Static_PropertyType();
    public propertyStatus: Static_PropertyStatus = new Static_PropertyStatus();
    public propertyConditionStatus: Static_PropertyConditionStatus = new Static_PropertyConditionStatus();
    public propertyTypology: Static_PropertyTypology = new Static_PropertyTypology();
    public energyCertificate: Static_EnergyCertificate = new Static_EnergyCertificate();
    //public ameneties: Array<Static_AmenetieType> = new Array<Static_AmenetieType();
}