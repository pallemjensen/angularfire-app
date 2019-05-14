import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'map',
    loadChildren: './map/module#MapModule'
  },
  {
    path: 'friends',
    loadChildren: './friends/friends.module#FriendsModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
