import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Friend} from './friend.model';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {FileService} from '../../files/shared/file.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friendDoc: AngularFirestoreDocument<Friend>;
  friend: Observable<Friend>;
  fileName: string;

  constructor(private db: AngularFirestore,
              private fileservice: FileService) {
  }

  getFriends(): Observable<Friend[]> {
    return this.db.collection<Friend>('Friends')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Friend;
            return {
              id: action.payload.doc.id,
              name: data.name,
              picture: data.picture,
              address: data.address,
              phone: data.phone,
              mail: data.mail,
              location: data.location
            };
          });
        })
      );
  }

  getFriendById(id: string): Observable<Friend> {
    return this.db.doc<Friend>('Friends/' + id).valueChanges();
  }


  deleteFriend(id: string): Observable<Friend> {
    return this.db.doc<Friend>('Friends/' + id)
      .get()
      .pipe(
        first(),
        tap(() => {
        }),
        switchMap(friendDocument => {
          if (!friendDocument || !friendDocument.data()) {
            window.alert('Friend does not exist or contains no data.');
            throw new Error('Friend not found');
          } else {
            return from (
              this.db.doc<Friend>('Friends/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = friendDocument.data() as Friend;
                data.id = friendDocument.id;
                return data;
              })
            );
          }
        })
      );
  }

  updateFriend(friend: Friend, file: File, id: string): Observable<Friend> {
    this.friendDoc = this.db.doc<Friend>('Friends/' + id);
    this.friend = this.friendDoc.valueChanges();
    this.fileName = this.fileservice.uploadFile(file);
    friend.picture = this.fileName;
    return from (
    this.friendDoc.update(friend))
      .pipe(
        map( () => {
          return friend;
        })
      );
  }

  public addFriend(friend: Friend, file: File): Observable<Friend> {
   this.fileName = this.fileservice.uploadFile(file);
   return from(
      this.db.collection('Friends')
      .add({
        name: friend.name,
        picture: this.fileName,
        address: friend.address,
        phone: friend.phone,
        location: friend.location,
        mail: friend.mail
      })
    ).pipe(
      map( friendRef => {
        friend.id = friendRef.id;
        return friend;
      })
    );
  }
}
