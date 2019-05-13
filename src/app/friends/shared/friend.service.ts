import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Friend} from './friend.model';
import {first, map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private db: AngularFirestore  ) { }

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

  deleteFriend(id: string): Observable<Friend> {
    return this.db.doc<Friend>('Friends/' + id)
      .get()
      .pipe(
        first(),
        tap(friendDocument => {
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

  public addFriend(friend: Friend): Observable<Friend> {
    return from(
      this.db.collection('Friends')
      .add({
        name: friend.name,
        picture: friend.picture,
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
