import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FriendsRoutingModule} from './friends-routing.module';
import {FriendListComponent} from './friend-list/friend-list.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilesModule} from '../files/files.module';
import {FriendAddComponent} from './friend-add/friend-add.component';
import {ButtonsModule} from 'ngx-bootstrap';
import { FriendUpdateComponent } from './friend-update/friend-update.component';
import {NgxsModule} from '@ngxs/store';
import { FriendsState} from '../store';
import {MatCardModule, MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [FriendListComponent, FriendAddComponent, FriendUpdateComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule,
    FilesModule,
    ButtonsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    NgxsModule.forFeature(FriendsState)
  ]
})
export class FriendsModule { }
