import { Component, OnInit } from '@angular/core';
import {FriendService } from "../../friends/shared/friend.service";

@Component({
  selector: 'app-map-show',
  templateUrl: './map-show.component.html',
  styleUrls: ['./map-show.component.css']
})
export class MapShowComponent implements OnInit {
  lat: number;
  lng: number;
  name: string;
  markers: marker[];

  constructor(private friendService: FriendService) {
    this.markers = new Array();
  }

  ngOnInit() {
    this.showFriendsOnMap();
  }

  showFriendsOnMap(){
     this.friendService.getFriends()
      .subscribe( friends => {
        friends.forEach(friend => {
          this.markers.push({
            lat: friend.location.latitude,
            lng: friend.location.longitude,
            label: friend.name
          })
        })
      });
  }
  maxZoom: number = 9;
  minZoom: number = 2;
  zoom: number = 2;
  locationChosen = false;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  clickedMarker(label: string, index: number){
    console.log(`clicked the marker: ${label || index}`)
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
}

