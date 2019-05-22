import { Friend } from "../../friends/shared/friend.model";
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export class AddFriend {
  static readonly type = '[Friend] add Friend'

  constructor(public payload: { id?: string, name: any, picture?: string,  address: string,  mail: string, phone: string, location?: GeoPoint, url?: string}) {}

}

export class RemoveFriend {
  static readonly type = '[Friend] remove Friend';
  constructor (public payload: string) {}
}

export class LoadFriends {
  static readonly type = '[Friend] Load Friend';
}

export class LoadFriendsSuccess {
  static readonly type = '[Friend] Load Friends Success';
  constructor(public readonly payload: Friend[]) {}
}
export class LoadFriendsFail {
  static readonly type = '[Friend] Load Friends Fail';
  constructor(public readonly payload?: any) {}
}

export type FriendActions =
| RemoveFriend
| AddFriend
| LoadFriends
| LoadFriendsFail
| LoadFriendsSuccess
