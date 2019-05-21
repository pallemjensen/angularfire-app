import { Component, OnInit } from '@angular/core';
import {FriendService } from "../../friends/shared/friend.service";

@Component({
  selector: 'app-map-show',
  templateUrl: './map-show.component.html',
  styleUrls: ['./map-show.component.css']
})
export class MapShowComponent implements OnInit {
  protected map: any;
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

  onChoseLocation(eventLocation) {
    this.lat = eventLocation.coords.lat;
    this.lng = eventLocation.coords.lng;
    this.locationChosen = true;
  }

  protected mapReady(map) {
    this.map = map;
  }

  public markerClicked = (lat: number, lng: number) => {
    if (this.map)
      this.map.setCenter({ lat, lng });
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
}

