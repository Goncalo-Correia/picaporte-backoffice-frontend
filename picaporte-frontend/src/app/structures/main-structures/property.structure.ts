import { Image } from "../../models/image.model";
import { Property } from "../../models/property.model";
import { Static_AmenetieType } from "../../models/static/static-amenetieType.model";
import { AmenetieTypeStructure } from "../amenetie-type.structure";
import { DocumentStructure } from "../document.structure";
import { ImageStructure } from "../image.structure";
import { ImgurImageUploadStructure } from "../imgur/imgur-image-upload.structure";

export class PropertyStructure {
    property: Property = <Property>{};
    mainImage: ImageStructure = new ImageStructure(new Image(), new ImgurImageUploadStructure(), false);
    mainDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    certificateDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    otherDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
    images: Array<ImageStructure> = new Array<ImageStructure>();
    ameneties: Array<AmenetieTypeStructure> = new Array<AmenetieTypeStructure>();
}