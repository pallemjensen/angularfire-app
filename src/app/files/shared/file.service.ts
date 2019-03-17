import {Injectable} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {FileMetadata} from './file-metadata';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {ImageMetadata} from './image-metadata';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  upload(file: File): Observable<FileMetadata> {
    const uniqueId = this.db.createId();
    return defer(() => this.storage.ref('product-pictures/' + uniqueId)
          .put(file, {
            customMetadata: {
              originalName: file.name
            }
          })
          .then())
          .pipe(
            map( fileRef => {
              fileRef.id = uniqueId;
              return fileRef;
      })
    );
  }

  getFileUrl(id: string): Observable<any> {
   return this.storage.ref('product-pictures/' + id)
      .getDownloadURL();
  }

  uploadImage(imageMetadata: ImageMetadata): Observable<FileMetadata> {
    if (imageMetadata.imageBlob) {
      const fileToUpload = new File(
        [imageMetadata.imageBlob],
          imageMetadata.fileMeta.name,
        {type: imageMetadata.fileMeta.type});
      return this.upload(fileToUpload);
    }
  }
}
