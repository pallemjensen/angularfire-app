import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendService} from '../shared/friend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GeoPoint} from "@firebase/firestore-types";

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {

  friendFormGroup: FormGroup;
  private file: File;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private friendService: FriendService
              ) {

    this.friendFormGroup = new FormGroup( {
      name: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      mail: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      picture: new FormControl('')
  }); }

  ngOnInit() {
  }

  // makeGeopoint(latitude: number, longitude: number): GeoPoint {
  // return new GeoPoint(latitude, longitude);
  // }

  addFriend() {
    const friendData = this.friendFormGroup.value;
    this.friendService.addFriend(
      friendData, this.file
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
