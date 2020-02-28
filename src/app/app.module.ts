import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IndexComponent } from './containers/index/index.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { MapComponent } from './components/map/map.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CarrouselComponent,
    MapComponent,
    RsvpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }