import { Component, OnInit } from '@angular/core';
import {FriendService } from '../../friends/shared/friend.service';

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
  maxZoom = 9;
  minZoom = 2;
  zoom = 2;
  locationChosen = false;
  url: string;

  constructor(private friendService: FriendService
              ) {
    this.markers = [];
  }

  ngOnInit() {
    this.showFriendsOnMap();
  }

  showFriendsOnMap() {
     this.friendService.getFriends()
      .subscribe( friends => {
        friends.forEach(friend => {
          this.markers.push({
            lat: friend.location.latitude,
            lng: friend.location.longitude,
            label: friend.name
          });
        });
      });
  }

  onChoseLocation(eventLocation) {
    this.lat = eventLocation.coords.lat;
    this.lng = eventLocation.coords.lng;
    this.locationChosen = true;
  }

  protected mapReady(map) {
    this.map = map;
  }

  public markerClicked = (lat: number, lng: number) => {
    if (this.map) {
      this.map.panTo({ lat, lng });
    }
  }

}

// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
}
