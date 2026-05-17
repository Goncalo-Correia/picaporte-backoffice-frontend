import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/api-service/notification/notification.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isOpen: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onClick_toggle() {
    this.isOpen = !this.isOpen;
  }

  onClick_sendNewsletter() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => {
      this.notificationService.Send_Newsletter(resolve).subscribe(()=> {

      });
    });
  }
}
