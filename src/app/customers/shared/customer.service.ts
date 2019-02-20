import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Customer} from "./customer.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private db: AngularFirestore) { }

  getCustomers(): Observable<Customer[]> {
    return this.db.collection<Customer>('Customers')
      .snapshotChanges()
      .pipe(
        map(
          actions => {
            return actions.map(
              action => {
                const data = action.payload.doc.data() as Customer;
                return {
                  id: action.payload.doc.id,
                  firstName: data.firstName,
                  lastName: data.lastName
                };
              })
          })
      );
  }

  deleteCustomer(id: string) {
    this.db.doc<Customer>('Customers/' + id)
      .delete()
      .then(customer => {
        //debugger;
      })
      .catch(err => {
        //debugger;
      })
      .finally(() => {
        //debugger;
      });
  }
}
