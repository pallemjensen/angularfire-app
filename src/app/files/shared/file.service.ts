import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';




@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              ) { }

  uploadFile(file: File): Observable<string> {
    this.storage.ref('product-pictures/' + file.name)
      .put(file)
      .then(() => {
        // debugger;
      });
    return Observable.create();
  }

  getFileUrl(id: string): Observable<any> {
   return this.storage.ref('friend-pictures/' + id)
      .getDownloadURL();
  }
}
