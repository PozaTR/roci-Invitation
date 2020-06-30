import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { GuestService } from '../../services/guest.service';
import { Response } from '../../../interfaces/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public guestPhone: string;
  private validKeys: string[];
  public response: Response;

  constructor(private guestService: GuestService, private router: Router, private authService: AuthService) {
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
      'Enter'
    ];
    this.response = {};
  }

  ngOnInit(): void {
  }

  limitInputToNumbers(event) {
    console.log(event)
    if (!this.validKeys.find(key => key === event.key) || this.guestPhone.length >= 9) {
      event.preventDefault();
      return false;
    }
  }

  getPhone(event) {
      this.guestPhone = event.target.value;
  }

  async sendGuestPhone(phone: string) {
    try {
      const guest = await this.guestService.getGuest(phone).pipe(first()).toPromise();
      if (guest) {
        console.log('guest', guest);
        this.authService.guestId = guest.phone;
        this.router.navigate(['/app']);
      } else {
        this.response.error = 'No hemos encontrado tu número de teléfono. Por favor, contacta con Rocío.';
      }
    } catch (e) {
      this.response.error = 'Ha ocurrido un error. Por favor, vuelve a intentarlo.';
    }

    setTimeout(() => {
      this.response = {};
    }, 2000);
  }
}
