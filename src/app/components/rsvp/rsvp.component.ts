import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { RsvpInfo } from '../../../interfaces/rsvp-event';

@Component({
  selector: 'app-rsvp, [app-rsvp]',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})

export class RsvpComponent implements OnInit, OnChanges {
  @Input() guestInfo: RsvpInfo;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onGuestInfo: EventEmitter<RsvpInfo>;
  public willAssist: boolean;

  constructor() {
    this.onGuestInfo = new EventEmitter();
    this.willAssist = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.guestInfo && changes.guestInfo.currentValue) {
      this.willAssist = !!changes.guestInfo.currentValue.amount;
    }
  }

  getActiveCheck() {
    this.willAssist = !this.willAssist;
    if (this.willAssist) {
      this.onGuestInfo.emit({ amount: 1 });
    } else {
      this.onGuestInfo.emit({ amount: 0 });
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
    this.onGuestInfo.emit({ amount: count });
  }

}
