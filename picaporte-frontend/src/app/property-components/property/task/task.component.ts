import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { catchError } from 'rxjs';
import { QueriesTaskService } from 'src/app/api-service/queries-task/queries-task.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Enum_EntityType } from 'src/app/models/enum/entity-type.enum';
import { Enum_TaskStatus } from 'src/app/models/enum/task-status.enum';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  @Input() recordId: string = "";

  isDataFetched: boolean = false;

  tasks: Array<Task> = new Array<Task>();
  allocateTaskIndex: number = 0;
  taskActionIndex: number = 0;
  enum_taskStatus = Enum_TaskStatus;
  userEmail: string | undefined = "";

  constructor(
    private authenticationService: AuthenticationService,
    private queriesTaskService: QueriesTaskService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.get_TaskByRecordId();
    this.authService.getUser().subscribe(user => {
      this.userEmail = user?.email;
    })
  }

  onClick_allocateTask(index: number) {
    this.allocateTaskIndex = index;
    this.allocateTask();
  }

  onClick_taskAction(taskStatusId: Enum_TaskStatus, index: number) {
    this.taskActionIndex = index;
    this.tasks[this.taskActionIndex].taskStatusId = <number>taskStatusId;
    this.updateTask();
  }

  private get_TaskByRecordId() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queriesTaskService.GetTasksByRecordId(this.recordId, Enum_EntityType.PROPERTY, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.tasks = <Array<Task>>data;
      }); 
    });
  }

  private allocateTask() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.authService.getUser().subscribe(user => {
        this.queriesTaskService.Allocate(this.tasks[this.allocateTaskIndex].id, user?.email, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.get_TaskByRecordId();
        }); 
      });
    });
  }

  private updateTask() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queriesTaskService.Update(this.tasks[this.taskActionIndex], resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.get_TaskByRecordId();
      });
    });
  }
}
