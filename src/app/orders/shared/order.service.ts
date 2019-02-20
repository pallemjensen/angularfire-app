import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Order} from "./order.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  getOrders(): Observable<Order[]> {
    return this.db.collection<Order>('Orders')
      .valueChanges()
      .pipe(
        map(
          orders => {
            return orders.map(
              orders => {
              return {name: orders.name};
            })
          })
      );
  }
}
