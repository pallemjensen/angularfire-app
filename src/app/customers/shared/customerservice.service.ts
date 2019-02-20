import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

  constructor(private db: AngularFirestore) { }

  getCustomers(): Observable<any[]> {
    return this.db.collection('Customers').valueChanges();
  }
}
