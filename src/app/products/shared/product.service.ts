import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Product} from "./product.model";
import {first, map, switchMap, tap} from "rxjs/operators";

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

  deleteProduct(id: string): Observable<Product> {
    return this.db.doc<Product>('products/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
          //debugger;
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data())
          {
            window.alert('Product does not exist or contains no data.');
            throw new Error('Product not found');
          } else {
            return from (
              this.db.doc<Product>('products/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as Product;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      )
  }

  addProduct(product: Product): Observable<Product>{
    return from(
      this.db.collection('products')
      .add({
        name: product.name
      })
    ).pipe(
      map( productRef => {
        product.id = productRef.id;
        return product;
      })
    );
  }
}
