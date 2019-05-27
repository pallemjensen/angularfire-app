import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FriendService} from '../shared/friend.service';
import {Friend} from '../shared/friend.model';
import {FileService} from '../../files/shared/file.service';
import {tap} from 'rxjs/operators';
import {FriendState, GetFriendById, RemoveFriend, SetFriends} from '../../store';
import { Store, Select } from '@ngxs/store';
import {MatDialog} from "@angular/material";
import {FriendAddComponent} from "../friend-add/friend-add.component";


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})



export class FriendListComponent implements OnInit {
  friendId;
  Friends: Observable<Friend[]>;

  @Select(FriendState.getFriends) friends$: Observable<Friend[]>;


  constructor(private friendService: FriendService,
              private fileService: FileService,
              public store: Store,
              public dialog: MatDialog
             ) {

  }

  ngOnInit() {
    this.friendId = localStorage.getItem('friend');
    this.store.dispatch(new SetFriends(this.friendId));

    this.Friends = this.friendService.getFriends()
      .pipe(
        tap(friends => {
          friends.forEach(friend => {
            if (friend.picture) {
              this.fileService.getFileUrl(friend.picture)
                .subscribe(url => {
                  friend.url = url;
                });
              }
          });
        })
      );
  }
/*
  deleteFriend(friend: Friend) {
    const friendObservable = this.friendService.deleteFriend(friend.id);
    friendObservable.subscribe(friendFromFirebase => {
        window.alert('Friend with id: ' + friendFromFirebase.id + ' was deleted.');
      }, error1 => {
        window.alert('Friend with id: ' + friend.id + ' was not found.');
        });
  }*/

  deleteFriend(id: string) {
    this.store.dispatch(new RemoveFriend(id));
  }

  addFriend() {
    const ref = this.dialog.open(FriendAddComponent, { data: { friendId: this.friendId }});
  }

  editFriend(id: string) {
    this.store.dispatch(new GetFriendById(id)).subscribe(t => {
      const ref = this.dialog.open(FriendAddComponent, {
        data: { friendId: this.friendId, edit: true }});
    });
  }
}
