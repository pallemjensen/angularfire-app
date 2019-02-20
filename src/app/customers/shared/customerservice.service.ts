import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Customer} from "./customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

  constructor(private db: AngularFirestore) { }

  getCustomers(): Observable<Customer[]> {
    return this.db.collection<Customer>('Customers').valueChanges();
  }
}
