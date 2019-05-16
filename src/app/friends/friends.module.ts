import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FriendsRoutingModule} from './friends-routing.module';
import {FriendListComponent} from './friend-list/friend-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FilesModule} from '../files/files.module';
import {FriendAddComponent} from './friend-add/friend-add.component';

@NgModule({
  declarations: [FriendListComponent, FriendAddComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule,
    FilesModule
  ]
})
export class FriendsModule { }
