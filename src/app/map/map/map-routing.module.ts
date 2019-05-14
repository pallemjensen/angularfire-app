import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from "./map.component";
import {FriendListComponent} from "../../friends/friend-list/friend-list.component";

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: '',
    component: FriendListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }

