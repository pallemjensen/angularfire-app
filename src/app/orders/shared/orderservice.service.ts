import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Order} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor(private db: AngularFirestore) { }

  getOrders(): Observable<Order[]> {
    return this.db.collection<Order>('Orders').valueChanges();
  }
}
