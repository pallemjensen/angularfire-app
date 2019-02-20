import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FileMetadata} from "./file-metadata";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { }

  upload(file: File): Observable<FileMetadata>{
    this.storage.ref('product-pictures/' + file.name)
      .put(file)
      .then(() => {
        //debugger;
      });
    return Observable.create();
  }
}
