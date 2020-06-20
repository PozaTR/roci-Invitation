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

  constructor(private imageStorageService: ImageStorageService, private guestService: GuestService) {
    this.pictureUrls = [];
    this.guestId = '659743654';
  }

  ngOnInit(): void {
    this.imageStorageService.getPictures().then(pictureUrls => {
      this.pictureUrls = pictureUrls;
    });
    this.guestService.getGuest(this.guestId).subscribe(guest => {
      this.guestInfo = guest;
      console.log('this.guestInfo', this.guestInfo);
    });
  }

  sendGuestInfo(rsvpInfo: RsvpInfo) {
    const guestInfo: GuestInfo  = {
      number: rsvpInfo.number,
      willAssist: rsvpInfo.willAssist,
      name: this.guestName,
      phone: this.guestPhone,
    };
    console.log('funciono en el padre', guestInfo);
  }
}
