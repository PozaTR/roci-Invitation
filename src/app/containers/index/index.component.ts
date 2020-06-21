import { Component, OnInit } from '@angular/core';
import { ImageStorageService } from '../../services/image-storage.service';
import { GuestService } from '../../services/guest.service';
import { RsvpInfo } from '../../../interfaces/rsvp-event';
import { Guest } from '../../../interfaces/guest';

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
  public guestName: string;
  public guestPhone: number;
  private guestId: string;
  public guestInfo: Guest;
  public rsvp: RsvpInfo;

  constructor(private imageStorageService: ImageStorageService, private guestService: GuestService) {
    this.pictureUrls = [];
    this.guestId = '659743684';
  }

  ngOnInit(): void {
    this.imageStorageService.getPictures().then(pictureUrls => {
      this.pictureUrls = pictureUrls;
    });
    this.guestService.getGuest(this.guestId).subscribe(guest => {
      console.log('guest', guest);
      this.guestInfo = guest;
      this.rsvp = {
        amount: guest.amount,
        willAssist: !!guest.amount,
      };
      console.log('this.guestInfo', this.guestInfo);
    });
  }

  nameChange(event) {
    this.guestInfo.name = event.target.value;
  }

  phoneChange(event) {
    this.guestInfo.phone = event.target.value;
  }

  sendGuestInfo(rsvpInfo: RsvpInfo) {
    const guestInfo: GuestInfo  = {
      amount: rsvpInfo.amount,
      willAssist: rsvpInfo.willAssist,
      name: this.guestName,
      phone: this.guestPhone,
    };
    console.log('funciono en el padre', guestInfo);
  }
}
