import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapShowComponent} from "./map-show/map-show.component";

const routes: Routes = [
  {
    path: '',
    component: MapShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
