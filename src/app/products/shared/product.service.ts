import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from "./product.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            return {
              id: action.payload.doc.id,
              name: data.name
            };
          })
        })
      );
  }

  deleteProduct(id: string) {
    this.db.doc<Product>('products/' + id)
      .delete();
  }
}


/*
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products')
      .valueChanges()
      .pipe(
        map(products => {
          return products.map(product => {
            return {id: product.id, name: product.name, time: product.time};
})
})
);
}
}
 */
