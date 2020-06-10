import { Component, OnInit } from '@angular/core';
import { ImageStorageService } from '../../services/image-storage.service';
import { RsvpInfo } from '../../../interfaces/rsvp-event';

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

  constructor(private imageStorageService: ImageStorageService) {
    this.pictureUrls = [];
  }

  ngOnInit(): void {
    this.imageStorageService.getPictures().then(pictureUrls => {
      this.pictureUrls = pictureUrls;
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
