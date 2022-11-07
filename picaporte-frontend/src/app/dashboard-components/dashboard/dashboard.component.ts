import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesEntityReferenceService } from 'src/app/api-service/queries-entity-reference/queries-entity-reference.service';
import { EntityReference } from 'src/app/models/entity-reference.model';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { EntityReferenceDashboardStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-dashboard.structure';
import { EntityReferenceSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-search-and-filter.structure';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardKpis: Array<DashboardKpiStructure>;
  placeholderDashboardKpi: DashboardKpiStructure;

  entityReferenceList: Array<EntityReferenceDashboardStructure>;
  entityReferenceSearchAndFilterStructure: EntityReferenceSearchAndFilterStructure;
  next_searchAndFilterStructure: SearchAndFilterStructure;
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  constructor(
    public queries_entityReferenceService: QueriesEntityReferenceService,
    public router: Router) 
    {
    this.dashboardKpis = new Array<DashboardKpiStructure>();
    this.placeholderDashboardKpi = new DashboardKpiStructure();
    this.entityReferenceList = new Array<EntityReferenceDashboardStructure>();
    this.entityReferenceSearchAndFilterStructure = new EntityReferenceSearchAndFilterStructure();
    this.next_searchAndFilterStructure = new SearchAndFilterStructure();
   }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_dashboardStructure();
  }

  eventHandler_dashboardKpiClicked(clickedEntityTypeId: number) {
    if (this.entityReferenceSearchAndFilterStructure.entityTypeId != clickedEntityTypeId) {
      this.entityReferenceSearchAndFilterStructure.entityTypeId = clickedEntityTypeId;
    } else {
      this.entityReferenceSearchAndFilterStructure.entityTypeId = undefined;
    }
    this.get_dashboardStructure();
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
    this.get_dashboardStructure();
  }

  eventHandler_buttonClicked() {
    // DUMMY
  }

  get_dashboardStructure() {
    this.isDataFetched = false;
    this.queries_entityReferenceService.Post_SearchAndFilter_EntityReferenceStructure(this.entityReferenceSearchAndFilterStructure).subscribe((data: {}) => {
      this.entityReferenceList = <EntityReferenceDashboardStructure[]>data;
      this.isDataFetched = true;
      this.hasPreviousPage();
      this.hasNextPage();
    });
  }

  previous() {
    if(this.hasPrevious) {
      this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.page -= 1;

      this.get_dashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.page += 1;

      this.get_dashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.entityReferenceList.length == this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.size;
  }

  private get_Kpis() {
    this.queries_entityReferenceService.Get_Kpis().subscribe((data: {}) => {
      this.dashboardKpis = <DashboardKpiStructure[]>data;
      this.isKpiDataFetched = true;
    });
  }
}