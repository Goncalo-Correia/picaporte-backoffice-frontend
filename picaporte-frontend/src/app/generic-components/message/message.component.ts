import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  isToShowMessage: boolean = false;

  message: string = "";
  isSuccess: boolean = false;

  showMessage(errorMessage: string) {
    this.message = errorMessage;
    this.isToShowMessage = true;
  }

  hideMessage() {
    this.isToShowMessage = false;
    this.isSuccess = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
