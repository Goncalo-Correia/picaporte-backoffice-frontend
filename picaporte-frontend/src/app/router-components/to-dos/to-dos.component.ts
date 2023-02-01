import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { ToDoService } from 'src/app/api-service/to-do/to-do.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { ToDoItem } from 'src/app/models/to-do-item.model';
import { ToDoStructure } from 'src/app/structures/to-do.structure';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  isDataFetched: boolean = false;
  isEditable: boolean = false;
  isItemEditable: boolean = false;

  toDoStructureList: Array<ToDoStructure> = new Array<ToDoStructure>();;
  selectedToDo: ToDoStructure = new ToDoStructure();
  selectedToDoItem: ToDoItem = new ToDoItem();
  selectedToDoIndex: number = -1;
  selectedToDoItemIndex: number = -1;

  constructor(
    private toDoService: ToDoService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.get_toDos();
  }

  onClick_addNew() {
    this.selectedToDo = new ToDoStructure();
    this.toDoStructureList.push(this.selectedToDo);
    this.selectedToDoIndex = this.toDoStructureList.length - 1;
    this.isEditable = true;
  }

  onClick_addNewItem() {
    this.selectedToDoItem = new ToDoItem();
    this.selectedToDoItemIndex = -1;
    this.isItemEditable = true;
  }

  onClick_editable() {
    this.isEditable = true;
  }

  onClick_edit(index: number) {
    this.selectedToDo = new ToDoStructure();
    this.selectedToDo.toDo.id = this.toDoStructureList[index].toDo.id;
    this.selectedToDo.toDo.title = this.toDoStructureList[index].toDo.title;
    this.selectedToDo.toDo.description = this.toDoStructureList[index].toDo.description;
    this.selectedToDo.toDo.editedById = this.toDoStructureList[index].toDo.editedById;
    this.selectedToDo.toDo.editedOn = this.toDoStructureList[index].toDo.editedOn;
    this.selectedToDo.toDo.editedBy = this.toDoStructureList[index].toDo.editedBy;
    this.toDoStructureList[index].toDoItems.forEach(element => {
      this.selectedToDo.toDoItems.push(element);
    })
    this.selectedToDoIndex = index;
  }

  onClick_editItem(index: number) {
    this.selectedToDoItem = new ToDoItem();
    this.selectedToDoItem = this.selectedToDo.toDoItems[index];
    this.selectedToDoItemIndex = index;
    this.isItemEditable = true;
  }

  onClick_closeItem() {
    this.isItemEditable = false;
  }

  onClick_close() {
    if (this.selectedToDo.toDo.id != 0) {
      this.selectedToDo.toDo = this.toDoStructureList[this.selectedToDoIndex].toDo;
    } else {
      this.selectedToDoIndex = -1;
      this.get_toDos();
    }
    this.isEditable = false;
  }

  onChange_checkbox(index: number) {
    this.selectedToDo.toDoItems[index].isChecked = !this.selectedToDo.toDoItems[index].isChecked;
    this.post_checkToDoItem(index);
  }

  onClick_saveItem() {
    this.selectedToDoItem.toDoId = this.selectedToDo.toDo.id;
    this.post_toDoItem();
  }

  onClick_submit() {
    this.post_toDos();
  }

  onClick_confirmDelete() {
    this.delete_toDo();
  }

  onClick_deleteItem(index: number) {
    this.selectedToDo.toDoItems[index].isToDelete = true;
    this.delete_toDoItem(this.selectedToDo.toDoItems[index].id);
    this.selectedToDo.toDoItems = this.selectedToDo.toDoItems.filter(prop => prop.isToDelete == false);
    this.toDoStructureList[this.selectedToDoIndex].toDoItems = this.selectedToDo.toDoItems;
  }

  private get_toDos() {
    this.isDataFetched = false;
    this.isEditable = false;
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.toDoService.Get_ToDos(resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.toDoStructureList = <Array<ToDoStructure>>data;
        this.isDataFetched = true;
      });
    });
  }

  private post_checkToDoItem(index: number) {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.toDoService.Post_ToDoItem(this.selectedToDo.toDoItems[index], resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.selectedToDo.toDoItems[index] = <ToDoItem>data;
      });
    });
  }

  private post_toDoItem() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.toDoService.Post_ToDoItem(this.selectedToDoItem, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.selectedToDoItem = <ToDoItem>data;
        if (this.selectedToDoItemIndex == -1) {
          this.selectedToDo.toDoItems.push(this.selectedToDoItem);
        } else {
          this.selectedToDo.toDoItems[this.selectedToDoItemIndex] = this.selectedToDoItem;
        }
        this.isItemEditable = false;
      });
    });
  }

  private post_toDos() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.toDoService.Post_ToDos(this.selectedToDo, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.get_toDos();
      });
    });
  }

  private delete_toDo() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.toDoService.Delete_ToDo(this.selectedToDo.toDo.id, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.get_toDos();
        this.selectedToDo = new ToDoStructure();
        this.selectedToDoIndex = -1;
      });
    });
  }

  private delete_toDoItem(id: number) {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.toDoService.Delete_ToDoItem(id, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
      });
    });
  }
}
