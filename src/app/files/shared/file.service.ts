import {Injectable} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  upload(file: File): Observable<string> {
    const uniqueId = this.db.createId();
    return defer(() => this.storage.ref('friend-pictures/' + uniqueId)
          .put(file)
          .then())
          .pipe(
            map( fileRef => {
              fileRef.id = uniqueId;
              return uniqueId;
      })
    );
  }

  getFileUrl(id: string): Observable<any> {
   return this.storage.ref('friend-pictures/' + id)
      .getDownloadURL();
  }

  // uploadImage(imageMetadata: ImageMetadata): Observable<FileMetadata> {
  //   if (imageMetadata.imageBlob) {
  //     const fileToUpload = new File(
  //       [imageMetadata.imageBlob],
  //         imageMetadata.fileMeta.name,
  //       {type: imageMetadata.fileMeta.type});
  //     return this.upload(fileToUpload);
  //   }
  // }
}
