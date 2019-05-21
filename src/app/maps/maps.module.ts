import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import {MapShowComponent} from "./map-show/map-show.component";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [MapShowComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyvc7F_FXF0JWELjGqZXtMP7GMhumwcb4'})
  ]

})
export class MapsModule { }
