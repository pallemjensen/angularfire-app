import { Component, OnInit } from '@angular/core';
import {FriendService } from "../../friends/shared/friend.service";
import {Observable} from "rxjs";
import {Friend} from "../../friends/shared/friend.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-map-show',
  templateUrl: './map-show.component.html',
  styleUrls: ['./map-show.component.css']
})
export class MapShowComponent implements OnInit {
  friends: Observable<Friend[]>;
  lat: string;
  lng: string;

  constructor(private fs: FriendService) {
  }

  ngOnInit() {
this.getLng();
  }

  getLat(): string{
    this.friends = this.fs.getFriends()
      .pipe(
        tap(friends => {
          friends.forEach(friend => {
            if (friend.location) {
              // @ts-ignore
              this.fs.getFriends(friend.location)
                .subscribe(loc => {
                  friend.location = loc;
                });
            }
          });
        })
      );
    return this.lat
    console.log(this.lat)
  }

  getLng() {
    this.friends = this.fs.getFriends()
      .pipe(
        tap(friends => {
          friends.forEach(friend => {
            if (friend.location) {
              // @ts-ignore
              this.fs.getFriends(friend.location)
                .subscribe(loc => {
                  loc = friend.location.longitude
                  window.alert(loc)
                  return loc;
                });
            }
          });
        })
      );
  }

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

  mapClicked(event) {
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
    });
  }markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}


// just an interface for type safety.
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
}



