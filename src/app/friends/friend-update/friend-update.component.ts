import { Component, OnInit } from '@angular/core';
import {FriendService} from "../shared/friend.service";
import {FileService} from "../../files/shared/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Friend} from "../shared/friend.model";
import * as firebase from 'firebase/app';
import GeoPoint = firebase.firestore.GeoPoint;
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-friend-update',
  templateUrl: './friend-update.component.html',
  styleUrls: ['./friend-update.component.css']
})
export class FriendUpdateComponent implements OnInit {

  private friend: Friend;
  private file: File;
  private geoPoint: GeoPoint;
  latitude: number;
  longitude: number;
  id: string;


  friendFormGroup = new FormGroup( {
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    mail: new FormControl('')
  });

  constructor(private friendService: FriendService,
              private fileService: FileService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.friendService.getFriendById(this.id).
      subscribe(friend => {
        this.friendFormGroup.patchValue({
          name: friend.name,
          address: friend.address,
          phone: friend.phone,
          mail: friend.mail
        })
        this.latitude = friend.location.latitude;
        this.longitude = friend.location.longitude;
    });
  }

  makeGeopoint(latitude: number, longitude: number): GeoPoint {
    return new GeoPoint(latitude, longitude);
  }

  updateFriend() {
    const lat = this.latitude;
    const lng = this.longitude;
    this.friend = this.friendFormGroup.value;
    this.geoPoint = this.makeGeopoint(lat, lng);
    this.friend.location = this.geoPoint;
    this.friendService.updateFriend(this.friend, this.file, this.id)
      .subscribe(friend => {
          this.router.navigate(['../../'],
            {relativeTo: this.activatedRoute});
        },
        updateFriendError => {
          window.alert('An error occurred while trying to update a friend ' + JSON.stringify(updateFriendError));
        });
  }

  imageChange(event) {
    this.file = event.target.files[0];
  }
}
