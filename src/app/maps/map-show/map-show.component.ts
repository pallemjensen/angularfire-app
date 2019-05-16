import { Component, OnInit } from '@angular/core';
import {FriendService } from "../../friends/shared/friend.service";
import {Observable} from "rxjs";
import {Friend} from "../../friends/shared/friend.model";
import {map, tap} from "rxjs/operators";
import * as firebase from 'firebase/app';
import GeoPoint = firebase.firestore.GeoPoint;
import {Marker} from "@agm/core/services/google-maps-types";
import {AgmMarker} from "@agm/core";

@Component({
  selector: 'app-map-show',
  templateUrl: './map-show.component.html',
  styleUrls: ['./map-show.component.css']
})
export class MapShowComponent implements OnInit {
  friends: Observable<Friend>;
  lat: number;
  lng: number;
  name: string;

  constructor(private friendService: FriendService) {
  }

  ngOnInit() {
  }

  // showFriendsOnMap(): marker[]{
  //   Friend = this.friendService.getFriends()
  //     .pipe(
  //       tap(friends => {
  //         friends.forEach(friend => {
  //           this.markers.push({
  //             lat : friend.location.latitude,
  //             lng: friend.location.longitude,
  //             label: friend.name
  //           })
  //         });
  //       })
  //     );
  //   return this.markers;
  // }

  title = 'Friendfinder';
  EASVMarkerLat: number = 55.488432;
  EASVMarkerLng: number = 8.4465819;


  //    getFriendsLocation(event): Observable<Friend[]> {
  //   return this.getFriendsLocation();
  //   location ? : GeoPoint;
  // }

  zoom: number = 8;
  locationChosen = false;



  markers: marker[] = [
    {
      lat: this.EASVMarkerLat,
      lng: this.EASVMarkerLng,
      label: 'EASV',
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
    }
  ]

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  clickedMarker(label: string, index: number){
    console.log(`clicked the marker: ${label || index}`)
  }

  // mapClicked(event) {
  //   this.markers.push({
  //     lat: event.coords.lat,
  //     lng: event.coords.lng,
  //   });
  // }
}


interface marker {
  lat: number;
  lng: number;
  label?: string;
}

