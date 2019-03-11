import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Customer} from './customer.model';
import {map, switchMap, tap} from 'rxjs/operators';

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
              });
          })
      );
  }

  deleteCustomer(id: string): Observable<void> {
    return this.db.doc<Customer>('Customers/' + id)
      .get()
      .pipe(
        tap(customerDocument => {
          // debugger;
        }),
        switchMap(customerDocument => {
          if (!customerDocument || !customerDocument.data()) {
            window.alert('Customer does not exist or contains no data.');
            throw new Error('Customer not found');
          } else {
            return from (
              this.db.doc<Customer>('Customers/' + id)
                .delete()
            );
          }
        })
      );
  }
}
