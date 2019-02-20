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
    return this.db.collection<Customer>('Customers').
    valueChanges()
      .pipe(
        map(
      customers => {
        return customers.map(
          customers => {
            return {firstName: customers.firstName, lastName: customers.lastName }
          }
        )
      }
    ));
  }
}
