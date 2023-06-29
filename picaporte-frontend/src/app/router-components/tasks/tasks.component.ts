import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { QueriesTaskService } from 'src/app/api-service/queries-task/queries-task.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Task } from 'src/app/models/task.model';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { TaskKpiDashboardStructure } from 'src/app/structures/task-structures/task-kpi-dashboard.structure';
import { TaskSearchAndFilterStructure } from 'src/app/structures/task-structures/task-search-and-filter.structure';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  dashboardKpis: TaskKpiDashboardStructure = new TaskKpiDashboardStructure();
  placeholderDashboardKpi: DashboardKpiStructure = new DashboardKpiStructure();

  taskSearchAndFilterStructure: TaskSearchAndFilterStructure = new TaskSearchAndFilterStructure();
  tasks: Array<Task> = new Array<Task>();
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private queriesTaskService: QueriesTaskService
  ) { }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_Tasks();
  }

  eventHandler_typeDashboardKpiClicked(taskTypeId: number) {
    if (this.taskSearchAndFilterStructure.taskTypeId == taskTypeId) {
      this.taskSearchAndFilterStructure.taskTypeId = 0;
    } else {
      this.taskSearchAndFilterStructure.taskTypeId = taskTypeId;
    }
    this.taskSearchAndFilterStructure.searchAndFilter.page = 0;
    this.get_Tasks();
  }

  eventHandler_statusDashboardKpiClicked(taskStatudId: number) {
    if (this.taskSearchAndFilterStructure.taskStatusId == taskStatudId) {
      this.taskSearchAndFilterStructure.taskStatusId = 0;
    } else {
      this.taskSearchAndFilterStructure.taskStatusId = taskStatudId;
    }
    this.get_Tasks();
  }

  previous() {
    if(this.hasPrevious) {
      this.taskSearchAndFilterStructure.searchAndFilter.page -= 1;
      this.get_Tasks();
    }
  }

  next() {
    if(this.hasNext) {
      this.taskSearchAndFilterStructure.searchAndFilter.page += 1;

      this.get_Tasks();
    }
  }

  get_Tasks() {
    this.isDataFetched = false;
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queriesTaskService.SearchAndFilter(this.taskSearchAndFilterStructure, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        console.log(data);
        this.tasks = <Array<Task>>data;
        
        this.isDataFetched = true;
        this.hasPreviousPage();
        this.hasNextPage();
      }); 
    });
  }

  private hasPreviousPage() {
    this.hasPrevious = this.taskSearchAndFilterStructure.searchAndFilter.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.tasks.length == this.taskSearchAndFilterStructure.searchAndFilter.size;
  }

  private get_Kpis() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queriesTaskService.GetKpis(resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.dashboardKpis = <TaskKpiDashboardStructure>data;
        this.isKpiDataFetched = true;
      });
    });
  }
}
