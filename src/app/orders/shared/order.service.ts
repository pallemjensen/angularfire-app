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

  deleteOrder(id: string): Promise<void> {
    return this.db.doc<Order>('Orders/' + id)
      .delete();
  }
}
