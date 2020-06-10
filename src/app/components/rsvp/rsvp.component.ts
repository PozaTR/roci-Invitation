import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RsvpInfo } from '../../../interfaces/rsvp-event';

@Component({
  selector: 'app-rsvp, [app-rsvp]',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})

export class RsvpComponent implements OnInit {
  @Output() guestInfo: EventEmitter<RsvpInfo>;
  public activeCheck: boolean;
  public guestCount: number;

  constructor() {
    this.guestInfo = new EventEmitter();
    this.activeCheck = false;
    this.guestCount = 1;
  }

  ngOnInit(): void {
  }

  getActiveCheck() {
    this.activeCheck = !this.activeCheck;
    if (!this.activeCheck) {
      this.guestInfo.emit({number: 0, willAssist: false});
      console.log('funciono', {number: 0, willAssist: false});
    }
  }

  addGuest() {
    this.guestCount++;
  }

  substractGuest() {
    if (this.guestCount > 1) {
      this.guestCount--;
    }
  }

  countChange(event) {
   if (event.code === 'KeyE') {
     event.preventDefault();
     return false;
   }
  }

  sendGuestInfo(count: number) {
    this.guestInfo.emit({number: count, willAssist: true});
    console.log('funciono', {number: count, willAssist: true});
  }

}
