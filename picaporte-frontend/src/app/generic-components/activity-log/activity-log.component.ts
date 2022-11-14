import { Component, Input, OnInit } from '@angular/core';
import { ActivityLogService } from 'src/app/api-service/activity-log/activity-log.service';
import { ActivityLogStructure } from 'src/app/structures/activity-log.structure';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  @Input() entityReferenceId?: number = 0;

  activityLogs: Array<ActivityLogStructure>;
  isDataFetched: boolean = false;

  constructor(private activityLogService: ActivityLogService) {
    this.activityLogs = new Array<ActivityLogStructure>();
  }

  ngOnInit(): void {
    this.get_ActivityLogs();
  }

  private get_ActivityLogs() {
    this.activityLogService.GetActivityLogs(this.entityReferenceId).subscribe((data: {}) => {
      this.activityLogs = <ActivityLogStructure[]>data;
      this.isDataFetched = true;
    });
  }
}
