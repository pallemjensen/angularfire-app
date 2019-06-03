import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap';
import {AngularFireDatabaseModule} from '@angular/fire/database';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ButtonsModule,
    AngularFirestoreModule, AngularFireStorageModule,
    HttpClientModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHw1XrdTuOey13-mR9qLId7pMqYP7trIg'
    })
  ],
  providers: [AngularFirestore,
    AngularFireStorageModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
