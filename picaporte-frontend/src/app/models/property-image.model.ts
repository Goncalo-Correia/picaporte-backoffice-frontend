import { Image } from "./image.model";
import { Property } from "./property.model";

export class PropertyImage {
    public id: string = "";
    public propertyId: string | null = null;
    public imageId: string | null = null;
    public property: Property = new Property();
    public image: Image = new Image();
}
