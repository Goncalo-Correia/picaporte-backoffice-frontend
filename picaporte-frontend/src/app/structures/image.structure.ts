import { Image } from "../models/image.model";

export class ImageStructure {
    public image: Image = new Image();
    public content: string = "";
    public isToDelete: boolean = false;
}