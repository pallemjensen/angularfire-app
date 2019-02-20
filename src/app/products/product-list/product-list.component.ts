import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from "../shared/product.model";
import {FormControl, FormGroup} from "@angular/forms";
import {FileService} from "../../files/shared/file.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  productFormGroup: FormGroup;

  constructor(private productService: ProductService,
              private fileService: FileService) {
    this.productFormGroup = new FormGroup( {
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  deleteProduct(product: Product) {
    const obs = this.productService.deleteProduct(product.id)
      obs.subscribe(productFromFirebase => {
        window.alert('Product with id: ' + productFromFirebase.id + ' was deleted.');
      }, error1 => {
        window.alert('Product with id: ' + product.id + ' was not found.')
        });
  }

  addProduct(){
    const productData = this.productFormGroup.value;
    this.productService.addProduct(productData)
      .subscribe(product => {
      window.alert('Product with id: ' + product.id + ' and name: ' + product.name + ' was created.')
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.fileService.upload(file);
  }
}
