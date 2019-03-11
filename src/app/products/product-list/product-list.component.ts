import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {FileService} from '../../files/shared/file.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;


  constructor(private productService: ProductService,
              private fileService: FileService) {

  }

  ngOnInit() {
    this.products = this.productService.getProducts()
      .pipe(
        tap(products => {
          products.forEach(product => {
            if (product.pictureId) {
              this.fileService.getFileUrl(product.pictureId)
                .subscribe(url => {
                  product.url = url;
                });
              }
          });
        })
      );
  }

  deleteProduct(product: Product) {
    const obs = this.productService.deleteProduct(product.id);
    obs.subscribe(productFromFirebase => {
        window.alert('Product with id: ' + productFromFirebase.id + ' was deleted.');
      }, error1 => {
        window.alert('Product with id: ' + product.id + ' was not found.');
        });
  }


}
