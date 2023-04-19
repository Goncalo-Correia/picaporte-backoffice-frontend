import { Address } from "./address.model";
import { Customer } from "./customer.model";
import { Image } from "./image.model";
import { Static_AmenetieType } from "./static/static-amenetieType.model";
import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyConditionStatus } from "./static/static-propertyconditionstatus.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";
import { Static_PropertyType } from "./static/static-propertytype.model";
import { Static_PropertyTypology } from "./static/static-propertytypology.model";
import { User } from "./user.model";

export class Property {
    public id: number = 0;
    public reference: string = "";
    public description: string = "";
    public prompt: string = "";
    public isOnline: boolean = false;
    public price: number = 0;
    public bathrooms: number = 0;
    public totalConstructionArea: number = 0;
    public livingArea: number = 0;
    public hasTermiteCertificate: boolean = false;
    public constructionYear: number = 0;
    public videoUrl: string = "";
    
    public addressId: number = 0;
    public customerId: number = 0;
    public mainImageId: number = 0;
    public propertyTypeId: number = 0;
    public propertyStatusId: number = 0;
    public propertyConditionStatusId: number = 0;
    public propertyTypologyId: number = 0;
    public energyCertificateId: number = 0;

    public address: Address = new Address();
    public customer: Customer = new Customer();
    public mainImage: Image = new Image();
    public propertyType: Static_PropertyType = new Static_PropertyType();
    public propertyStatus: Static_PropertyStatus = new Static_PropertyStatus();
    public propertyConditionStatus: Static_PropertyConditionStatus = new Static_PropertyConditionStatus();
    public propertyTypology: Static_PropertyTypology = new Static_PropertyTypology();
    public energyCertificate: Static_EnergyCertificate = new Static_EnergyCertificate();

    public ameneties: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
    public documents: Array<Document> = new Array<Document>();
    public images: Array<Image> = new Array<Image>();
}