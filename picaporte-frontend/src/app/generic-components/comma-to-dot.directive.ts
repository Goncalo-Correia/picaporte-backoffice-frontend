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
    this.control.control?.setValue(value);
  }
}
