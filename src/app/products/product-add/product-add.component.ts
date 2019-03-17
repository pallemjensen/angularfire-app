import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
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
    this.productService.addProductWithImage(
      productData,
      // undefined
      this.getMetaDataForImage()
    ).subscribe(product => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
    },
      error1 => {
        window.alert('An error occurred while trying to add a product ' + error1);
      });
  }
  private getMetaDataForImage(): ImageMetadata {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
  }


  // private getMetaDataForImage(): ImageMetadata {
  //   if (this.imageChangedEvent &&
  //     this.imageChangedEvent.target &&
  //     this.imageChangedEvent.target.files &&
  //     this.imageChangedEvent.target.files.length > 0) {
  //     const fileBeforeCrop = this.imageChangedEvent.target.files[0];
  //     return {
  //       imageBlob: this.croppedBlob,
  //       fileMeta: {
  //         name: fileBeforeCrop.name,
  //         type: 'image/png',
  //         size: fileBeforeCrop.size
  //       }
  //     };
  //   }
  //   return undefined;
  // }





























  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
}
