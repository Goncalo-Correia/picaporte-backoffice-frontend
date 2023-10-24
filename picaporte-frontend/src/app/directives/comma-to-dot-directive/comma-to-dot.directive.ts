import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCommaToDot]'
})
export class CommaToDotDirective {

  constructor(private control: NgControl) {

  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    value = value.replace(/,/g, '.');
    value = value.replace(/[^0-9.]/g, '');
    value = value.replace(/(\..*)\./g, '$1');
    
    // Removes leading dots and convert remaining dots to spaces
    value = value.replace(/^\./g, '').replace(/\./g, ' ');
    
    // Add spaces every three digits
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    this.control.control?.setValue(value);
  }
}
