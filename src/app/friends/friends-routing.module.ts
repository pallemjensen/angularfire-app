import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FriendListComponent} from './friend-list/friend-list.component';
import {FriendAddComponent} from './friend-add/friend-add.component';
import {FriendUpdateComponent} from "./friend-update/friend-update.component";

const routes: Routes = [
  {
    // /friends//add
    path: 'add',
    component: FriendAddComponent
  },
  {
    // /friends
    path: '',
    component: FriendListComponent
  },
  {
    path: 'update/:id',
    component: FriendUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
