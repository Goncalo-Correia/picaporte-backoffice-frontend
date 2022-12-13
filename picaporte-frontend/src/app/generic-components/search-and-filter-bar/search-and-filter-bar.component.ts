import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-and-filter-bar',
  templateUrl: './search-and-filter-bar.component.html',
  styleUrls: ['./search-and-filter-bar.component.css']
})
export class SearchAndFilterBarComponent implements OnInit {

  showFilters: boolean = false;
  timeout: any;
  
  constructor() { }

  @Input() searchText: string = "";
  @Input() buttonLabel: string = "";
  @Input() showButton: boolean = false;
  @Input() placeholder: string = "";
  @Input() hasFilters: boolean = false;
  @Input() hasSelectedFilter: boolean = false;

  @Output() searchTextChanged = new EventEmitter<string>();
  @Output() buttonClicked = new EventEmitter();

  ngOnInit(): void {
  }

  onChange() {
    this.searchTextChanged.emit(this.searchText);
  }

  onClick_button() {
    this.buttonClicked.emit();
  }

  onClick_openCloseFilters() {
    this.showFilters = !this.showFilters;
  }
}
