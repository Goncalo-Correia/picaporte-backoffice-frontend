import { User } from "./user.model";

export class ToDo {
    id: number = 0;
    title: string = "";
    description: string = "";
    editedOn: Date = new Date();
    editedById: number = 0;
    editedBy: User = new User();
}