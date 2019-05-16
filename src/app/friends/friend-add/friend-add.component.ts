import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendService} from '../shared/friend.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';
import GeoPoint = firebase.firestore.GeoPoint;
import {Friend} from "../shared/friend.model";

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {
  private friend: Friend;
  friendFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  private file: File;
  private latFromForm: number;
  private lngFromForm: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private friendService: FriendService
              ) {

    this.friendFormGroup = new FormGroup( {
      name: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      mail: new FormControl(''),
      picture: new FormControl(''),
      this: this.locationFormGroup = new FormGroup({
        latitude: new FormControl(''),
        longitude: new FormControl(''),
      }),
  }); }


  ngOnInit() {
  }

  makeGeopoint(latitude: number, longitude: number): GeoPoint {
  return new GeoPoint(latitude, longitude);
  }

  addFriend() {
    this.friend = this.friendFormGroup.value;
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
