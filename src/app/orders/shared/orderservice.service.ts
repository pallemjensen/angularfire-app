import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor(private db: AngularFirestore) { }

  getOrders(): Observable<any[]> {
    return this.db.collection('Orders').valueChanges();
  }
}
