import { Image } from "../models/image.model";
import { Property } from "../models/property.model";
import { Static_AmenetieType } from "../models/static/static-amenetieType.model";

export class PropertyStructure {
    property: Property = <Property>{};
    mainImage: Image = <Image>{};
    documents: Array<Document> = new Array<Document>();
    images: Array<Image> = new Array<Image>();
    ameneties: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
}