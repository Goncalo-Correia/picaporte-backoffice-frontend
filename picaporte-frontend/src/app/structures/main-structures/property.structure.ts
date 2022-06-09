import { Image } from "../../models/image.model";
import { Property } from "../../models/property.model";
import { Static_AmenetieType } from "../../models/static/static-amenetieType.model";
import { DocumentStructure } from "../document.structure";

export class PropertyStructure {
    property: Property = <Property>{};
    mainImage: Image = <Image>{};
    mainDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    certificateDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    otherDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    images: Array<Image> = new Array<Image>();
    ameneties: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
}