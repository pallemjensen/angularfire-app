import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {any} from "codelyzer/util/function";
import {storage} from "firebase";




@Injectable({
  providedIn: 'root'
})
export class FileService {


  randomId: string;
  name: string;
  constructor(private storage: AngularFireStorage) { }

  uploadFile(file: File): string {
    this.name = this.getRandomId();
    this.storage.ref('friend-pictures/' + this.name)
      .put(file)
      .then(() => {
        return this.name;
      });
    return this.name;
  }

  getFileUrl(id: string): Observable<any> {
   return this.storage.ref('friend-pictures/' + id)
      .getDownloadURL();
  }

  getRandomId(): string {
    this.randomId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    return this.randomId;
  }
}
