import { User } from "./user.model";

export class ToDo {
    id: number = 0;
    title: string = "";
    description: string = "";
    createdById: number = 0;
    createdOn: Date = new Date();
    lastModifiedById: number = 0;
    lastModifiedOn: Date = new Date();
    createdBy: User = new User();
    lastModifiedBy: User = new User();
}