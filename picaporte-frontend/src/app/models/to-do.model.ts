import { User } from "./user.model";

export class ToDo {
    id: string = "";
    title: string = "";
    description: string = "";
    editedOn: Date = new Date();
    editedById: string | null = null;
    editedBy: User = new User();
}