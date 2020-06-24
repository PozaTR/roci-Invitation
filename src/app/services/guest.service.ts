import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { Guest } from '../../interfaces/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private database: AngularFireDatabase;

  constructor(database: AngularFireDatabase) {
    this.database = database;
  }

  getGuest(guestId: string): Observable<Guest> {
    return this.database.object<Guest>(`guests/${guestId}`).valueChanges();
  }

  async updateGuest(guest: Guest): Promise<any> {
    return this.database.object<Guest>(`guests/${guest.phone}`).set(guest);
  }
}
