import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public guestPhone: string;
  private validKeys: string[];

  constructor() {
    this.guestPhone = '';
    this.validKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];
  }

  ngOnInit(): void {
  }

  limitInputToNumbers(event) {
    if (!this.validKeys.find(key => key === event.key) || this.guestPhone.length >= 9) {
      event.preventDefault();
      return false;
    }
  }

  getPhone(event) {
      this.guestPhone = event.target.value;
  }

}
