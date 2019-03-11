import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, throwError} from 'rxjs';
import {Product} from './product.model';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {ImageMetadata} from "../../files/shared/image-metadata";
import {FileService} from "../../files/shared/file.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore,
              private fileService: FileService) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            return {
              id: action.payload.doc.id,
              name: data.name,
              pictureId: data.pictureId
            };
          });
        })
      );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.db.doc<Product>('products/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
          // debugger;
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
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
      );
  }

  private addProduct(product: Product): Observable<Product> {
    return from(
      this.db.collection('products')
      .add({
        name: product.name,
        pictureId: product.pictureId
      })
    ).pipe(
      map( productRef => {
        product.id = productRef.id;
        return product;
      })
    );
  }

  addProductWithImage(product: Product, imageMeta: ImageMetadata)
    : Observable<Product>{
    if (imageMeta && imageMeta.fileMeta &&
    imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image) && imageMeta.fileMeta.size > 100){
      return this.fileService.uploadImage(imageMeta)
        .pipe(
          switchMap(metadata => {
            product.pictureId = metadata.id;
            return this.addProduct(product);
          })
        );
    } else
      {
        return throwError('You done goofed your metadata');
    }
  }
}
