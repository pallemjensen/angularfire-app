import { Component, OnInit } from '@angular/core';
import {FriendService } from '../../friends/shared/friend.service';
import {FileService} from '../../files/shared/file.service';
import {AngularFirestore} from '@angular/fire/firestore';

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
  maxZoom = 9;
  minZoom = 2;
  zoom = 2;
  locationChosen = false;
  picUrl: any;
  url: string;
  icon = {
    url: this.picUrl,
    scaledSize: {
      width: 40,
      height: 40
    }
  };

  constructor(private friendService: FriendService,
              private fileService: FileService) {
    this.markers = [];
    this.pictureUrls = [];
  }

  ngOnInit() {
    this.getUrls();
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

  getUrls() {
    this.friendService.getFriends()
      .subscribe( friends => {
        friends.forEach(friend => {
          this.pictureUrls.push({
           picUrl : this.fileService.getFileUrl(friend.picture)
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

  iconX = {
    url: '../assets/images/lion.jpg',
    scaledSize: {
      width: 40,
      height: 40
    }
  };



  // getIcon(): { scaledSize: { width: number; height: number }; url: string } {
  //   for (const p of this.pictureUrls) {
  //   this.icon = {
  //     url : p,
  //     scaledSize: {
  //       width: 40,
  //       height: 40
  //     }
  //   };
  //   }
  //   return this.icon;
  // }


}


// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
}

// tslint:disable-next-line:class-name
interface pictureUrl {
  picUrl: any;
}

