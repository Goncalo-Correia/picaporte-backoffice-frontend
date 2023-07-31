import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyConditionStatus } from "./static/static-propertyconditionstatus.model";
import { Static_PropertyLocationType } from "./static/static-propertylocationtype.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";

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
    public comment: string = "";
    
    public propertyStatusId: number = 0;
    public propertyLocationTypeId: number = 0;
    public propertyConditionStatusId: number = 0;
    public energyCertificateId: number = 0;

    public propertyStatus: Static_PropertyStatus = new Static_PropertyStatus();
    public propertyLocationType: Static_PropertyLocationType = new Static_PropertyLocationType();
    public propertyConditionStatus: Static_PropertyConditionStatus = new Static_PropertyConditionStatus();
    public energyCertificate: Static_EnergyCertificate = new Static_EnergyCertificate();
}