import { Friend } from '../friends/shared/friend.model';
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export class AddFriend {
  static readonly type = '[FRIEND] Add'

  constructor(public payload: Friend) {}
  /*{ id?: string, name: any, picture?: string,  address: string,  mail: string, phone: string, location?: GeoPoint, url?: string}) {}*/
}

export class RemoveFriend {
  static readonly type = '[FRIEND] Remove';
  constructor(public payload: string) {}
}

export class GetFriendById {
  static readonly  type = '[FRIEND] Get';

  constructor(public payload: string) {}
}

export class SetFriends {
  static readonly type = '[FRIEND] Set';

  constructor(public payload: string) {}
}


export class UpdateFriend {
  static readonly type = '[FRIEND] Update';

  constructor(public payload: Friend) {}
}

export type FriendActions =
| RemoveFriend
| GetFriendById
| SetFriends
| UpdateFriend
| AddFriend;
