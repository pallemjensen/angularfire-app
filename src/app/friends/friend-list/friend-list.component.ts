import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FriendService} from '../shared/friend.service';
import {Friend} from '../shared/friend.model';
import {FileService} from '../../files/shared/file.service';
import {tap} from 'rxjs/operators';
import {FriendState} from '../../store';
import { Store, Select } from '@ngxs/store';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  Friends: Observable<Friend[]>;

  constructor(private friendService: FriendService,
              private fileService: FileService,
              private store: Store
             ) {

  }

  ngOnInit() {
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

  deleteFriend(friend: Friend) {
    const friendObservable = this.friendService.deleteFriend(friend.id);
    friendObservable.subscribe(friendFromFirebase => {
        window.alert('Friend with id: ' + friendFromFirebase.id + ' was deleted.');
      }, error1 => {
        window.alert('Friend with id: ' + friend.id + ' was not found.');
        });
  }
}
