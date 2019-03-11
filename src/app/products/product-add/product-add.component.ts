import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {Product} from '../shared/product.model';
import {ImageMetadata} from '../../files/shared/image-metadata';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService
              ) {
    this.productFormGroup = new FormGroup( {
    name: new FormControl('')
  }); }

  ngOnInit() {
  }

  addProduct() {
    const productData = this.productFormGroup.value;
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];

    const imageMeta: ImageMetadata = {
      imageBlob: this.croppedBlob,
      fileMeta: {
        name: fileBeforeCrop.name,
        type: 'image/png',
        size: fileBeforeCrop.size
      }
    };

    this.productService.addProductWithImage(
      productData,
      imageMeta

    ) .subscribe(product => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
      // window.alert('Product with id: ' + product.id + ' and name: ' + product.name + ' was created.')
    });
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
}
