import { Component, OnInit } from '@angular/core';
import {FriendService} from "../shared/friend.service";
import {FileService} from "../../files/shared/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Friend} from "../shared/friend.model";
import * as firebase from 'firebase/app';
import GeoPoint = firebase.firestore.GeoPoint;

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


  friendFormGroup = new FormGroup( {
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    mail: new FormControl(''),
    picture: new FormControl(''),
  });


  constructor(private friendService: FriendService,
              private fileService: FileService) { }

  ngOnInit() {
  }

  makeGeopoint(latitude: number, longitude: number): GeoPoint {
    return new GeoPoint(latitude, longitude);
  }

  updateFriend() {
  }

  imageChange(event) {
    this.file = event.target.files[0];
  }
}
