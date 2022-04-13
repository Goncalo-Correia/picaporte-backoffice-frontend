import { Address } from "./address.model";
import { BusinessCard } from "./businesscard.model";
import { Customer } from "./customer.model";
import { Image } from "./image.model";
import { Static_AmenetieType } from "./static/static-amenetieType.model";
import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";
import { Static_PropertyType } from "./static/static-propertytype.model";
import { Static_PropertyTypology } from "./static/static-propertytypology.model";
import { User } from "./user.model";

export class Property {
    constructor(
        public id: number,
        public reference: string,
        public description: string,
        public price: number,
        public bathrooms: number,
        public totalConstructionArea: number,
        public livingArea: number,
        public hasTermiteCertificate: boolean,
        public constructionYear: number,
        public createdOn: Date,
        public lastModifiedOn: Date,
        
        public addressId: number,
        public customerId: number,
        public mainImageId: number,
        public propertyTypeId: number,
        public propertyStatusId: number,
        public propertyTypologyId: number,
        public energyCertificateId: number,
        public createdByUserId: number,
        public updatedByUserId: number,

        public address: Address,
        public customer: Customer,
        public mainImage: Image,
        public propertyType: Static_PropertyType,
        public propertyStatus: Static_PropertyStatus,
        public propertyTypology: Static_PropertyTypology,
        public energyCertificate: Static_EnergyCertificate,
        public createdByUser: User,
        public uploadedByUser: User,

        public ameneties: Array<Static_AmenetieType>,
        public businessCards: Array<BusinessCard>,
        public documents: Array<Document>,
        public images: Array<Image>
    ) {};
}