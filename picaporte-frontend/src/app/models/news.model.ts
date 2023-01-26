import { Image } from "./image.model";

export class News {
    id: number = 0;
    title: string = "";
    content: string = "";
    isOnline: boolean = false;
    order: number = 0;
    imageId: number = 0;
    image: Image = new Image();
}