import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products').valueChanges();
  }
}
