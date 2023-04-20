import { Image } from "../../models/image.model";
import { Document } from "../../models/document.model";
import { Property } from "../../models/property.model";
import { AmenetieTypeStructure } from "../amenetie-type.structure";

export class PropertyStructure {
    property: Property = new Property();
    mainDocuments: Array<Document> = new Array<Document>();
    certificateDocuments: Array<Document> = new Array<Document>();
    otherDocuments: Array<Document> = new Array<Document>();
    images: Array<Image> = new Array<Image>();
    ameneties: Array<AmenetieTypeStructure> = new Array<AmenetieTypeStructure>();
    recommendedProperties: Array<Property> = new Array<Property>();
    entityReferenceId: number = 0;
}