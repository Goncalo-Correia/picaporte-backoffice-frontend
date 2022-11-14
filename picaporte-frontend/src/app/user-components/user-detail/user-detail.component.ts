import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User = <User>{};
  @Input() customerId: number = 0;
  @Input() customerName: string = "";
  @Input() isEditable: boolean = false;

  @Output() event_updateUserDetails = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick_selectUserRole(isAdmin: boolean) {
    this.user.isAdmin = isAdmin;
    this.triggerEvent_updateUserDetails();
  }

  triggerEvent_updateUserDetails() {
    this.event_updateUserDetails.emit(this.user);
  }

}
