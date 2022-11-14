import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/api-service/to-do/to-do.service';
import { ToDoItem } from 'src/app/models/to-do-item.model';
import { ToDoStructure } from 'src/app/structures/to-do.structure';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {

  isDataFetched: boolean = false;
  isEditable: boolean = false;

  toDoStructureList: Array<ToDoStructure>;
  selectedToDo: ToDoStructure;
  selectedToDoIndex: number = -1;

  constructor(private toDoService: ToDoService) { 
    this.toDoStructureList = new Array<ToDoStructure>();
    this.selectedToDo = new ToDoStructure();
  }

  ngOnInit(): void {
    this.get_toDos();
  }

  onClick_editable() {
    this.isEditable = true;
  }

  onClick_addNew() {
    this.selectedToDo = new ToDoStructure();
    this.selectedToDoIndex = 0;
    this.isEditable = true;
  }

  onClick_addNewItem() {
    this.selectedToDo.toDoItems.push(new ToDoItem());
  }

  onClick_edit(index: number) {
    this.selectedToDo = this.toDoStructureList[index];
    this.selectedToDoIndex = index;
  }

  onClick_close() {
    this.selectedToDo = new ToDoStructure();
    this.selectedToDoIndex = -1;
    this.isEditable = false;
  }

  onClick_submit() {
    this.post_toDos();
  }

  onClick_confirmDelete() {
    this.delete_toDo();
  }
  
  private get_toDos() {
    this.isDataFetched = false;
    this.isEditable = false;
    this.toDoService.Get_ToDos().subscribe((data) => {
      this.toDoStructureList = <ToDoStructure[]>data;
      this.isDataFetched = true;
    });
  }

  private post_toDos() {
    this.toDoService.Post_ToDos(this.selectedToDo).subscribe(() => {
      this.get_toDos();
    });
  }

  private delete_toDo() {
    this.toDoService.Delete_ToDo(this.selectedToDo.toDo.id).subscribe(() => {
      this.get_toDos();
    });
  }
}
