import { Component, OnInit } from '@angular/core';
import {FriendService } from "../../friends/shared/friend.service";
import {FileService} from "../../files/shared/file.service";

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
  pictureUrls: pictureUrl[];


  constructor(private friendService: FriendService,
              private fileService: FileService) {
    this.markers = [];
    this.pictureUrls = [];
  }

  ngOnInit() {
    this.getUrls();
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

  getUrls(){
    this.friendService.getFriends()
      .subscribe( friends => {
        friends.forEach(friend => {
          this.pictureUrls.push({
            picUrl: this.fileService.getFileUrl(friend.picture).subscribe()
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
      this.map.panTo({ lat, lng });
  };

  private iconx: { scaledSize: { width: number; height: number }; url: string };

  getIcon(): { scaledSize: { width: number; height: number }; url: string } {
    for (let p of this.pictureUrls)
    {
    this.icon = {
      url: 'p',
      scaledSize: {
        width: 40,
        height: 40
      }
    }}
    return this.icon;
  }

  icon = {
    url: './assets/images/lion.jpg',
    scaledSize: {
      width: 40,
      height: 40
    }
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
}

interface pictureUrl {
  picUrl: any;
}

interface icon {
  url: string;
}

