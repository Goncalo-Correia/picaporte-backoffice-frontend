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

  toDoStructureList: Array<ToDoStructure> = new Array<ToDoStructure>();
  selectedToDo: ToDoStructure;
  selectedToDoIndex: number = -1;

  constructor(
    private toDoService: ToDoService,
    private authenticationService: AuthenticationService
  ) {
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
    console.log(index);
    console.log(this.selectedToDo);
    
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
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.toDoService.Get_ToDos(resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.toDoStructureList = <ToDoStructure[]>data;
        this.isDataFetched = true;
        console.log(this.toDoStructureList);
        
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
      });
    });
  }
}
