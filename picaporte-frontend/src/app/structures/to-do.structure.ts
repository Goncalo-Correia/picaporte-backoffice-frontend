import { ToDoItem } from "../models/to-do-item.model";
import { ToDo } from "../models/to-do.model";

export class ToDoStructure {
    toDo: ToDo = new ToDo();
    toDoItems: Array<ToDoItem> = new Array<ToDoItem>();
}

export { ToDoItem as ToDoItemDto };
