import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from "../shared/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id)
      .then(() => {
        window.alert('Product with id: ' + product.id + ' was deleted.');
      })
      .catch(err => {
        //debugger;
      })
      .finally(() => {
        //debugger;
      });
  }
}
