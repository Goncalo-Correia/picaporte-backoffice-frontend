import { Component, OnInit } from '@angular/core';
import { QueriesEntityReferenceService } from 'src/app/api-service/queries-entity-reference/queries-entity-reference.service';
import { EntityReference } from 'src/app/models/entity-reference.model';
import { EntityReferenceDashboardStructure } from 'src/app/structures/dashboard-structures/entity-reference-dashboard.structure';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  entityReferenceList: Array<EntityReferenceDashboardStructure>;
  searchAndFilterStructure: SearchAndFilterStructure;
  next_searchAndFilterStructure: SearchAndFilterStructure;
  isDataFetched: boolean = false;
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  constructor(public queries_entityReferenceService: QueriesEntityReferenceService) {
    this.entityReferenceList = new Array<EntityReferenceDashboardStructure>();
    this.searchAndFilterStructure = new SearchAndFilterStructure();
    this.next_searchAndFilterStructure = new SearchAndFilterStructure();
   }

  ngOnInit(): void {
    this.get_dashboardStructure();
  }

  get_dashboardStructure() {
    this.queries_entityReferenceService.Post_SearchAndFilter_EntityReferenceStructure(this.searchAndFilterStructure).subscribe((data: {}) => {
      this.entityReferenceList = <EntityReferenceDashboardStructure[]>data;
      this.isDataFetched = true;
      this.hasPreviousPage();
      this.hasNextPage();
    });
  }

  previous() {
    if(this.hasPrevious) {
      this.searchAndFilterStructure.page -= 1;

      this.get_dashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.searchAndFilterStructure.page += 1;

      this.get_dashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.entityReferenceList.length == this.searchAndFilterStructure.size;
  }

}