import { Component, OnInit } from '@angular/core';
import { ImageStorageService } from '../../services/image-storage.service';
import { GuestService } from '../../services/guest.service';
import { RsvpInfo } from '../../../interfaces/rsvp-event';
import { Guest } from '../../../interfaces/guest';
import { Response } from '../../../interfaces/response';

interface GuestInfo extends RsvpInfo {
  name: string;
  phone: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public pictureUrls: string[];
  private guestId: string;
  public guestInfo: Guest;
  public rsvp: RsvpInfo;
  public response: Response;

  constructor(private imageStorageService: ImageStorageService, private guestService: GuestService) {
    this.pictureUrls = [];
    this.response = {};
    this.guestId = '659743684';
  }

  ngOnInit(): void {
    this.imageStorageService.getPictures().then(pictureUrls => {
      this.pictureUrls = pictureUrls;
    });
    this.guestService.getGuest(this.guestId).subscribe(guest => {
      this.guestInfo = guest;
      this.rsvp = {
        amount: guest.amount
      };
    });
  }

  nameChange(event) {
    this.guestInfo.name = event.target.value;
  }

  phoneChange(event) {
    this.guestInfo.phone = event.target.value;
  }

  async sendGuestInfo(rsvpInfo: RsvpInfo) {
    const guestInfo: GuestInfo  = {
      amount: rsvpInfo.amount,
      name: this.guestInfo.name.trim(),
      phone: this.guestInfo.phone,
    };
    try {
      await this.guestService.updateGuest(guestInfo);
      this.response.success = 'Hemos guardado tu información correctamente';
    } catch (err) {
      this.response.error = 'Ha ocurrido un error. Por favor, vuelve a intentarlo.';
    }
    setTimeout(() => {
      this.response = {};
    }, 2000);
  }
}
