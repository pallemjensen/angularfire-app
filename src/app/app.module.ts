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
import { NgxsModule } from '@ngxs/store';
import { FriendState } from "./store/state/friend.state";
import {NgxsLoggerPlugin, NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ButtonsModule,
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireStorageModule,
    HttpClientModule,
    AgmCoreModule,
    NgxsModule.forRoot([FriendState], {developmentMode: !environment.production}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHw1XrdTuOey13-mR9qLId7pMqYP7trIg'
    })
  ],
  providers: [AngularFirestore,
    AngularFireStorageModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
