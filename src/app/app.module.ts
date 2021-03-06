import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { IndexComponent } from './containers/index/index.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { MapComponent } from './components/map/map.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FormsModule } from '@angular/forms';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { MainComponent } from './containers/main/main.component';
import { LoginComponent } from './containers/login/login.component';
import {AuthGuardService} from './services/guards/auth-guards.service';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CarrouselComponent,
    MapComponent,
    RsvpComponent,
    MainHeaderComponent,
    ObjectKeysPipe,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
