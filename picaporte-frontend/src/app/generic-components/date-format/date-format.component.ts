import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.css']
})
export class DateFormatComponent implements OnInit {

  @Input() date: Date = new Date();
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  formatDate(date: Date): string {
    // Use 'Z' for UTC, or provide a specific timezone, e.g., '+0200' or 'Australia/Sydney'
    let formattedDate: string | null = this.datePipe.transform(date, 'MMMM d, y hh:mm', 'Z');
    let finalDate: string = "";
    if (formattedDate != null) {
      finalDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return finalDate;
  }
}
