import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../files/shared/file.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  productFormGroup: FormGroup;
  private fileToUpload: File;

  constructor(private productService: ProductService,
              private fileService: FileService) {
    this.productFormGroup = new FormGroup( {
      name: new FormControl('')
    });
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
        window.alert('Product with id: ' + product.id + ' was not found.')
        });
  }

  addProduct() {
    const productData = this.productFormGroup.value;
    if (this.fileToUpload) {
      this.fileService.upload(this.fileToUpload)
      .pipe(
        switchMap(metadata => {
          productData.pictureId = metadata.id;
          return this.productService.addProduct(productData);
        })
      )
        .subscribe(product => {
          window.alert('Product with id: ' + product.id + ' and name: ' + product.name + ' was created.')
        });
    }
  }

  uploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }
}
