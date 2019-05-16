import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendService} from '../shared/friend.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app'
import GeoPoint = firebase.firestore.GeoPoint;
import {Friend} from "../shared/friend.model";

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {
  private friend: Friend;
  private file: File;
  private geoPoint : GeoPoint;

  friendFormGroup = new FormGroup( {
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    mail: new FormControl(''),
    picture: new FormControl(''),
    location: new FormGroup({
      latitude: new FormControl(''),
      longitude: new FormControl(''),
    }),
  });

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private friendService: FriendService
              ) {}

  ngOnInit() {
  }

  makeGeopoint(latitude: number, longitude: number): GeoPoint {
  return new GeoPoint(latitude, longitude);
  }

  addFriend() {
    this.friend = this.friendFormGroup.value;
    this.geoPoint = this.makeGeopoint(45, 45);
    this.friend.location = this.geoPoint;
    this.friendService.addFriend(
      this.friend, this.file
    ).subscribe(friend => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
    },
      addFriendError => {
        window.alert('An error occurred while trying to add a friend error1 ' + JSON.stringify(addFriendError));
      });
  }

  imageChange(event) {
    this.file = event.target.files[0];
  }
}
