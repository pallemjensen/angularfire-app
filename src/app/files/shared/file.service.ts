import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FileMetadata} from "./file-metadata";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  upload(file: File): Observable<FileMetadata>{
    return Observable.create();
  }
}
