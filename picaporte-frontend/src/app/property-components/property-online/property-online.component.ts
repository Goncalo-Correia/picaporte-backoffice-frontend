import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-property-online',
  templateUrl: './property-online.component.html',
  styleUrls: ['./property-online.component.css']
})
export class PropertyOnlineComponent implements OnInit {

  @Input() isOnline: boolean = false;
  @Input() isEditable: boolean = false;

  @Output() event_updatePropertyOnline = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick_changeOnlineStatus(isOnline: boolean) {
    this.isOnline = isOnline;
    this.triggerEvent_updatePropertyOnline();
  }

  triggerEvent_updatePropertyOnline() {
    this.event_updatePropertyOnline.emit(this.isOnline);
  }
}
