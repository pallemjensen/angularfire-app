import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Order} from "./order.model";
import {map, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) {
  }

  getOrders(): Observable<Order[]> {
    return this.db.collection<Order>('Orders')
      .snapshotChanges()
      .pipe(
        map(
          actions => {
            return actions.map(
              action => {
                const data = action.payload.doc.data() as Order;
                return {
                  id: action.payload.doc.id,
                  name: data.name
                };
              })
          })
      );
  }

  deleteOrder(id: string): Observable<void> {
    return this.db.doc<Order>('Orders/recfsearfc' + id)
      .get()
      .pipe(
        tap(orderDocument => {
          //debugger;
        }),
        switchMap(orderDocument => {
          if (!orderDocument || !orderDocument.data()) {
            window.alert('Order does not exist or contains no data.');
            throw new Error('Order not found');
          } else {
            return from(
              this.db.doc<Order>('Orders/' + id)
                .delete()
            )
          }
        })
      )
  }
}
