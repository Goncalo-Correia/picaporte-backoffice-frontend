import { Component, OnInit } from '@angular/core';
import { QueriesPropertyService } from 'src/app/api-service/queries-property/queries-property.service';
import { PropertyDashboardStructure } from 'src/app/structures/property-dashboard.structure';
import { SearchAndFilterStructure } from 'src/app/structures/search-and-filter.structure';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent implements OnInit {

  propertyDashboardStructureArray: PropertyDashboardStructure[];
  searchAndFilterStructure: SearchAndFilterStructure;
  next_searchAndFilterStructure: SearchAndFilterStructure;
  isDataFetched: boolean = false;
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  constructor(public queries_propertyService: QueriesPropertyService) {
    this.propertyDashboardStructureArray = new Array<PropertyDashboardStructure>();
    this.searchAndFilterStructure = new SearchAndFilterStructure();
    this.next_searchAndFilterStructure = new SearchAndFilterStructure();
  }

  ngOnInit(): void {
    this.get_propertyDashboardStructure();
  }

  get_propertyDashboardStructure() {
    this.queries_propertyService.Post_SearchAndFilter_PropertyStructure(this.searchAndFilterStructure).subscribe((data: {}) => {
      this.propertyDashboardStructureArray = <PropertyDashboardStructure[]>data;
      this.isDataFetched = true;
      this.hasPreviousPage();
      this.hasNextPage();
    });
  }

  previous() {
    if(this.hasPrevious) {
      this.searchAndFilterStructure.page -= 1;

      this.get_propertyDashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.searchAndFilterStructure.page += 1;

      this.get_propertyDashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.propertyDashboardStructureArray.length == this.searchAndFilterStructure.size;
  }
}
