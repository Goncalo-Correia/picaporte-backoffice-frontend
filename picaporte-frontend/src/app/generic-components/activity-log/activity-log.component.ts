import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { ActivityLogService } from 'src/app/api-service/activity-log/activity-log.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { ActivityLogStructure } from 'src/app/structures/activity-log.structure';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  @Input() entityReferenceId: number = 0;

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;

  activityLogs: Array<ActivityLogStructure>;
  isDataFetched: boolean = false;
  maxHeight: number = 0;

  constructor(
    private activityLogService: ActivityLogService,
    private authenticationService: AuthenticationService
  ) {
    this.activityLogs = new Array<ActivityLogStructure>();
  }

  ngOnInit(): void {
    this.get_ActivityLogs();
  }

  private get_ActivityLogs() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.activityLogService.GetActivityLogs(this.entityReferenceId, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.activityLogs = <ActivityLogStructure[]>data;
        this.isDataFetched = true;
      });
    });
  }
}
