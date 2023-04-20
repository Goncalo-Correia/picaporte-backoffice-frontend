import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { QueriesUserService } from 'src/app/api-service/queries-user/queries-user.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { User } from 'src/app/models/user.model';
import { UserValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { UserStructure } from 'src/app/structures/main-structures/user.structure';
import { PreferenceStructure } from 'src/app/structures/preference.structure';
import { Enum_UserSubMenu, UserSubMenu, UserSubMenuFactory } from 'src/app/submenus/user.submenu';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  userId: number = 0;
  
  isEditable: boolean = false;
  isLoading: boolean = false;
  isDataFetched: boolean = false;
  
  userStructure: UserStructure;
  userSubmenus: Array<UserSubMenu>;
  selectedUserSubMenu: Enum_UserSubMenu = Enum_UserSubMenu.DETAILS;
  userValidationObject: UserValidationObject = new UserValidationObject();

  isOnDetailsSubMenu: boolean = true;
  isOnPreferencesSubMenu: boolean = false;
  isOnActivityLogMenu: boolean = false;

  private userSubmenuFactory: UserSubMenuFactory;

  constructor(
    public queries_userService: QueriesUserService,
    private activeRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private validationService: ValidationService
  ) { 
    this.userStructure = new UserStructure();
    this.userSubmenus = new Array<UserSubMenu>();
    this.userSubmenuFactory = new UserSubMenuFactory();
  }

  ngOnInit(): void {
    this.getActiveRoute();
    this.get_userSubmenus();
    if (this.userId != 0) {
      this.get_userStructure();
    } else {
      this.isDataFetched = true;
    }
  }

  onClick_edit() {
    this.isEditable = true;
  }

  onClick_cancel() {
    this.isEditable = false;
    if (this.userId != 0) {
      this.get_userStructure();
    }  
  }

  onClick_submit() {
    this.isEditable = false;
    this.userValidationObject = new UserValidationObject();
    this.userValidationObject = this.validationService.validateUser(
      this.userStructure.user.firstName, 
      this.userStructure.user.lastName, 
      this.userStructure.user.email
    );
    if (this.userValidationObject.isValid) {
      this.submit_user();
    } else {
      this.isEditable = true;
    }
  }

  onClick_selectSubMenu(enum_selectedUserSubMenu: Enum_UserSubMenu | undefined) {
    if (enum_selectedUserSubMenu != undefined) {
      this.selectedUserSubMenu = enum_selectedUserSubMenu;
    }
    this.checkSelectedSubMenu();
  }

  eventHandler_updateUserDetails(data: User) {
    this.userStructure.user = data;
  }

  eventHandler_updateUserPreferences(data: Array<PreferenceStructure>) {
    this.userStructure.preferences = [...data];
  }
  
  private get_userStructure() {
    this.isLoading = true;
    this.isDataFetched = false;
    if (this.userId != 0 && this.userId != null) {
      this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
        this.queries_userService.Get_UserStructure(this.userId, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.userStructure = <UserStructure>data;
          this.isDataFetched = true;
          this.isLoading = false;
        });
      });
    } else {
      this.isDataFetched = true;
      this.isLoading = false;
      this.isEditable = true;
    }
  }

  private get_userSubmenus() {
    this.userSubmenus = this.userSubmenuFactory.getUserSubmenus();
  }

  private submit_user() {
    this.isLoading = true;

    if (this.userStructure.user.id == 0 || this.userStructure.user.id == null) {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.queries_userService.Post_UserStructure(this.userStructure, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.userStructure.user = <User>data;
          this.userId = this.userStructure.user.id;
          this.get_userStructure();
        });
      });
    } else {
      this.authenticationService.authorizeUser().then((resolve:any) => { 
        this.queries_userService.Put_UserStructure(this.userId, this.userStructure, resolve)
        .pipe(
          catchError(err => {
            this.messageComponent.showMessage(err.error);
            return err;
          })
        )
        .subscribe(data => {
          this.get_userStructure();
        });
      });
    }
  }

  private getActiveRoute() {
    this.activeRoute.paramMap.subscribe(res => {
      this.userId = <number><unknown>res.get('id');
    });  
  }

  private checkSelectedSubMenu() {
    this.isOnDetailsSubMenu = this.selectedUserSubMenu == Enum_UserSubMenu.DETAILS;
    this.isOnPreferencesSubMenu = this.selectedUserSubMenu == Enum_UserSubMenu.PREFERENCES;
    this.isOnActivityLogMenu = this.selectedUserSubMenu == Enum_UserSubMenu.HISTORY;
  }
}
