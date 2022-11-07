import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.component.html',
  styleUrls: ['./dashboard-kpi.component.css']
})
export class DashboardKpiComponent implements OnInit {

  constructor() { 
    this.dashboardKpiStructure = new DashboardKpiStructure();
  }
  
  @Input() dashboardKpiStructure: DashboardKpiStructure;
  @Input() isSelected: boolean = false;
  @Input() isPlaceholder: boolean = false;

  @Output() dashboardKpiClicked = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onClick() {
    this.dashboardKpiClicked.emit(this.dashboardKpiStructure.id);
  }

}
