import { Image } from "../../models/image.model";
import { Property } from "../../models/property.model";
import { Static_AmenetieType } from "../../models/static/static-amenetieType.model";
import { AmenetieTypeStructure } from "../amenetie-type.structure";
import { DocumentStructure } from "../document.structure";
import { ImageStructure } from "../image.structure";

export class PropertyStructure {
    property: Property = <Property>{};
    mainImage: ImageStructure = new ImageStructure();
    mainDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    certificateDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    otherDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    images: Array<ImageStructure> = new Array<ImageStructure>();
    ameneties: Array<AmenetieTypeStructure> = new Array<AmenetieTypeStructure>();
}