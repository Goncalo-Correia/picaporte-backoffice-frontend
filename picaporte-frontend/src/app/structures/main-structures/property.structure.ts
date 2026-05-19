import { DocumentDto } from "../../models/document-dto.model";
import { ImageDto } from "../../models/image-dto.model";
import { Property } from "../../models/property.model";
import { AmenetieTypeStructure } from "../amenetie-type.structure";

export class PropertyStructure {
    property: Property = new Property();
    mainImage: ImageDto = new ImageDto();
    mainDocuments: Array<DocumentDto> = new Array<DocumentDto>();
    certificateDocuments: Array<DocumentDto> = new Array<DocumentDto>();
    otherDocuments: Array<DocumentDto> = new Array<DocumentDto>();
    images: Array<ImageDto> = new Array<ImageDto>();
    ameneties: Array<AmenetieTypeStructure> = new Array<AmenetieTypeStructure>();
    recommendedProperties: Array<Property> = new Array<Property>();
    entityReferenceId: string = "";
}