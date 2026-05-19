import { User } from "./user.model";
import { ImageDto } from "./image-dto.model";

export class News {
    id: string = "";
    title: string = "";
    content: string = "";
    isOnline: boolean = false;
    isApproved: boolean = false;
    order: number = 0;
    imageId: string | null = null;
    editedById: string | null = null;
    editedOn: Date = new Date();
    editedBy: User = new User();
    image: ImageDto = new ImageDto();
}