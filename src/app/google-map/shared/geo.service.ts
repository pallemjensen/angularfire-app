import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { GeoFire } from 'geofire';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  dbRef: any;
  geoFire: any;

  hits = new BehaviorSubject([])
  constructor(private db: AngularFireDatabase) {
    /// Reference database location for GeoFire
    this.dbRef = this.db.list('/locations');
    this.geoFire = new GeoFire(this.dbRef.$ref);
  }

  /// Adds GeoFire data to database
  setLocation(key:string, coords: Array<number>) {
    this.geoFire.set(key, coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err))
  }


}
