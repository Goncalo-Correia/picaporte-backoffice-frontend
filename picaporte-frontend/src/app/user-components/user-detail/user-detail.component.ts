import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserValidationObject } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User = new User();
  @Input() customerId: number = 0;
  @Input() customerName: string = "";
  @Input() isEditable: boolean = false;
  @Input() userValidationObject: UserValidationObject = new UserValidationObject();

  @Output() event_updateUserDetails = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  onFocus_name() {
    this.userValidationObject.isNameValid.isValid = true;
  }

  onFocus_surrname() {
    this.userValidationObject.isSurrnameValid.isValid = true;
  }

  onFocus_email() {
    this.userValidationObject.isEmailValid.isValid = true;
  }

  onClick_selectUserRole(isAdmin: boolean) {
    this.user.isAdmin = isAdmin;
    this.triggerEvent_updateUserDetails();
  }

  triggerEvent_updateUserDetails() {
    this.event_updateUserDetails.emit(this.user);
  }

}
