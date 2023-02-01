import { User } from "./user.model";
import { Image } from "./image.model";

export class News {
    id: number = 0;
    title: string = "";
    content: string = "";
    isOnline: boolean = false;
    order: number = 0;
    imageId: number = 0;
    editedById: number = 0;
    editedOn: Date = new Date();
    editedBy: User = new User();
    image: Image = new Image();
}