import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Friend } from "../friends/shared/friend.model";
import {GetFriendById, RemoveFriend} from "./friend.actions";
import {FriendService} from "../friends/shared/friend.service";

export interface FriendsStateModel {
  friends: Friend[];
  friendById: Friend;
}

@State<FriendsStateModel> ({
  name: 'friendState',
  defaults: {
    friends: [],
    friendById: null
  }
})

export class FriendState {

  constructor(private service: FriendService) {}

  @Selector()
  static getFriends(state: FriendsStateModel) {
    return state.friends;
  }

  @Selector()
  static getIdFriend(state: FriendsStateModel) {
    return state.friendById;
  }

  @Action(RemoveFriend)
  remove({getState, patchState }: StateContext<FriendsStateModel>, { payload }: RemoveFriend) {
    this.service.deleteFriend(payload);
  }

  @Action(GetFriendById)
  get({getState, patchState}: StateContext<FriendsStateModel>, { payload }: GetFriendById) {
    const state = getState();
    patchState({
      friendById: state.friends.find(o => o.id === payload)
    });
  }

}
