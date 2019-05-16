import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FriendsRoutingModule} from './friends-routing.module';
import {FriendListComponent} from './friend-list/friend-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilesModule} from '../files/files.module';
import {FriendAddComponent} from './friend-add/friend-add.component';
import {ButtonsModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [FriendListComponent, FriendAddComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule,
    FilesModule,
    ButtonsModule,
    FormsModule
  ]
})
export class FriendsModule { }
