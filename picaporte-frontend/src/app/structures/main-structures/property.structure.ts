import { Image } from "../../models/image.model";
import { Document } from "../../models/document.model";
import { Property } from "../../models/property.model";
import { Static_AmenetieType } from "../../models/static/static-amenetieType.model";
import { AmenetieTypeStructure } from "../amenetie-type.structure";

export class PropertyStructure {
    property: Property = new Property();
    mainImage: Image = new Image();
    mainDocuments: Array<Document> = new Array<Document>();
    certificateDocuments: Array<Document> = new Array<Document>();
    otherDocuments: Array<Document> = new Array<Document>();
    images: Array<Image> = new Array<Image>();
    ameneties: Array<AmenetieTypeStructure> = new Array<AmenetieTypeStructure>();
    entityReferenceId: number = 0;
}