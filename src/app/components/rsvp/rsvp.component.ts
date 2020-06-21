import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RsvpInfo } from '../../../interfaces/rsvp-event';

@Component({
  selector: 'app-rsvp, [app-rsvp]',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})

export class RsvpComponent implements OnInit {
  @Input() guestInfo: RsvpInfo;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onGuestInfo: EventEmitter<RsvpInfo>;

  constructor() {
    this.onGuestInfo = new EventEmitter();
  }

  ngOnInit(): void {
  }

  getActiveCheck() {
    this.guestInfo.willAssist = !this.guestInfo.willAssist;
    if (!this.guestInfo.willAssist) {
      this.onGuestInfo.emit({ amount: 0, willAssist: false });
      console.log('funciono', { amount: 0, willAssist: false });
    }
  }

  addGuest() {
    this.guestInfo.amount++;
  }

  substractGuest() {
    if (this.guestInfo.amount > 1) {
      this.guestInfo.amount--;
    }
  }

  countChange(event) {
   if (event.code === 'KeyE') {
     event.preventDefault();
     return false;
   } else {
     this.guestInfo.amount = event.target.value;
   }
  }

  sendGuestInfo(count: number) {
    this.onGuestInfo.emit({ amount: count, willAssist: true });
    console.log('funciono', { amount: count, willAssist: true });
  }

}
