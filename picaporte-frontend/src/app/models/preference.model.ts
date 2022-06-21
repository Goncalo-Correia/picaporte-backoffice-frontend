import { Static_AmenetieType } from "./static/static-amenetieType.model";
import { Static_EnergyCertificate } from "./static/static-energycertificate.model";
import { Static_PropertyConditionStatus } from "./static/static-propertyconditionstatus.model";
import { Static_PropertyStatus } from "./static/static-propertystatus.model";
import { Static_PropertyType } from "./static/static-propertytype.model";
import { Static_PropertyTypology } from "./static/static-propertytypology.model";

export class Preference {
    constructor(
        public id?: number,
        public minPrice?: number,
        public maxPrice?: number,
        public numBathrooms?: number,
        public constructionYear?: number,
        
        public propertyTypeId?: number,
        public propertyStatusId?: number,
        public propertyConditionStatusId?: number,
        public propertyTypologyId?: number,
        public energyCertificateId?: number,

        public propertyType?: Static_PropertyType,
        public propertyStatus?: Static_PropertyStatus,
        public propertyConditionStatus?: Static_PropertyConditionStatus,
        public propertyTypology?: Static_PropertyTypology,
        public energyCertificate?: Static_EnergyCertificate,

        public ameneties?: Array<Static_AmenetieType>
    ) {};
}