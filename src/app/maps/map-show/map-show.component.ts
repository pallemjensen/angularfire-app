import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map-show',
  templateUrl: './map-show.component.html',
  styleUrls: ['./map-show.component.css']
})
export class MapShowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'Friendfinder';
  lat: number = 51.678418;
  lng: number = 7.809007;

  /*
    getFriendsLocation(event): Observable<Friend[]> {
      return this.getFriendsLocation();
        //location?: GeoPoint;
    }*/

  zoom: number = 8;
  locationChosen = false;


  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
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
      draggable: true
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
  draggable: boolean;

}
