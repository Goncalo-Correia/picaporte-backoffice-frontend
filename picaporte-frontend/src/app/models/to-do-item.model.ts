import { ToDo } from "./to-do.model";

export class ToDoItem {
    id: string = "";
    label: string = "";
    description: string = "";
    isChecked: boolean = false;
    order: number = 0;
    isToDelete: boolean = false;
    toDoId: string | null = null;
    toDo: ToDo = new ToDo();
}
