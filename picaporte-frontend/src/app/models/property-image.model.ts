import { Image } from "./image.model";

export class PropertyImage {
    public id: string = "";
    public propertyId: string | null = null;
    public imageId: string | null = null;
    public image: Image = new Image();
}
