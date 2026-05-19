import { Address } from "./address.model";
import { Customer } from "./customer.model";
import { ImageDto } from "./image-dto.model";
import { PropertyAmenetieType } from "./property-amenitie-type.model";
import { PropertyDocument } from "./property-document.model";
import { PropertyImage } from "./property-image.model";
import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyConditionStatus } from "./static/static-propertyconditionstatus.model";
import { Static_PropertyLocationType } from "./static/static-propertylocationtype.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";
import { Static_PropertyType } from "./static/static-propertytype.model";
import { Static_PropertyTypology } from "./static/static-propertytypology.model";

export class Property {
    public id: string = "";
    public reference: string = "";
    public description: string = "";
    public prompt: string = "";
    public isOnline: boolean = false;
    public price: number | null = null;
    public bathrooms: number | null = null;
    public totalConstructionArea: number | null = null;
    public livingArea: number | null = null;
    public hasTermiteCertificate: boolean = false;
    public constructionYear: number | null = null;
    public videoUrl: string = "";

    public addressId: string | null = null;
    public customerId: string | null = null;
    public mainImageId: string | null = null;
    public propertyTypeId: number | null = null;
    public propertyStatusId: number | null = null;
    public propertyLocationTypeId: number | null = null;
    public propertyConditionStatusId: number | null = null;
    public propertyTypologyId: number | null = null;
    public energyCertificateId: number | null = null;

    public address: Address = new Address();
    public customer: Customer = new Customer();
    public mainImage: ImageDto = new ImageDto();
    public propertyType: Static_PropertyType = new Static_PropertyType();
    public propertyLocationType: Static_PropertyLocationType = new Static_PropertyLocationType();
    public propertyStatus: Static_PropertyStatus = new Static_PropertyStatus();
    public propertyConditionStatus: Static_PropertyConditionStatus = new Static_PropertyConditionStatus();
    public propertyTypology: Static_PropertyTypology = new Static_PropertyTypology();
    public energyCertificate: Static_EnergyCertificate = new Static_EnergyCertificate();

    public propertyAmenetieTypes: Array<PropertyAmenetieType> = new Array<PropertyAmenetieType>();
    public propertyDocuments: Array<PropertyDocument> = new Array<PropertyDocument>();
    public propertyImages: Array<PropertyImage> = new Array<PropertyImage>();

    public formattedPrice: string = "";
    public formattedLivingArea: string = "";
    public formattedTotalConstructionArea: string = "";
}