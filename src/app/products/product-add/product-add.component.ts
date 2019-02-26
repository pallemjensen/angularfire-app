import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {ProductService} from "../shared/product.service";
import {FileService} from "../../files/shared/file.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  private fileToUpload: File;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fileService: FileService) {
    this.productFormGroup = new FormGroup( {
    name: new FormControl('')
  });}

  ngOnInit() {
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
          this.router.navigate(['../'],
            {relativeTo: this.activatedRoute});
          //window.alert('Product with id: ' + product.id + ' and name: ' + product.name + ' was created.')
        });
    }
  }

  uploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }

}
