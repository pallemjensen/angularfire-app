import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Friend } from "../friends/shared/friend.model";
import { AddFriend, RemoveFriend} from "./friend.actions";
import {FriendService} from "../friends/shared/friend.service";
import * as friendActions from './friend.actions'
import {catchError, map} from "rxjs/operators";
import {asapScheduler, of} from "rxjs";

export interface FriendsStateModel{
  friends: Friend[];
  loaded: boolean;
  loading: boolean;
  selectedFriendId: string;
}

@State<FriendsStateModel> ({
  name: 'friends',
  defaults: {
    friends: [],
    loaded: false,
    loading: false,
    selectedFriendId: null
  }
})


  export class FriendState {
  friends: Friend[];
  constructor(private friendService: FriendService) {}

  @Selector()
  static getFriends(state: FriendsStateModel){
    return state.friends
  }


  @Action(friendActions.AddFriend)
  add({getState, patchState}: StateContext<FriendsStateModel>, { payload } : AddFriend){
    const state = getState();
    patchState({
      friends: [...state.friends, payload]
    })
  }

  @Action(friendActions.RemoveFriend)
  remove({getState, patchState}: StateContext<FriendsStateModel>, { payload } : RemoveFriend){
    patchState({
      friends: getState().friends.filter(a => a.name != payload)
    })
  }

  @Action(friendActions.LoadFriends)
  loadFriends({ patchState, dispatch }: StateContext<FriendsStateModel>){
    patchState({loading: true});
    return this.friendService
      .getFriends()
      .pipe(
        map((friends: Friend[]) =>
        asapScheduler.schedule(() =>
        dispatch(new friendActions.LoadFriendsSuccess(friends))
        )
        ),
        catchError(error =>
        of (
          asapScheduler.schedule(() =>
          dispatch(new friendActions.LoadFriendsFail(error)))
        ))
      )
  }

}
