import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyConditionStatus } from "./static/static-propertyconditionstatus.model";
import { Static_PropertyLocationType } from "./static/static-propertylocationtype.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";

export class Preference {
    public id: string = "";
    public minPrice: number | null = null;
    public maxPrice: number | null = null;
    public numBathrooms: number | null = null;
    public constructionYear: number | null = null;
    public minLivingArea: number | null = null;
    public maxLivingArea: number | null = null;
    public minTotalArea: number | null = null;
    public maxTotalArea: number | null = null;
    public comment: string = "";

    public propertyStatusId: number | null = null;
    public propertyLocationTypeId: number | null = null;
    public propertyConditionStatusId: number | null = null;
    public energyCertificateId: number | null = null;

    public propertyStatus: Static_PropertyStatus = new Static_PropertyStatus();
    public propertyLocationType: Static_PropertyLocationType = new Static_PropertyLocationType();
    public propertyConditionStatus: Static_PropertyConditionStatus = new Static_PropertyConditionStatus();
    public energyCertificate: Static_EnergyCertificate = new Static_EnergyCertificate();
}