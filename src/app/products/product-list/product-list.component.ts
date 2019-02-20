import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from "../shared/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        //debugger;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
