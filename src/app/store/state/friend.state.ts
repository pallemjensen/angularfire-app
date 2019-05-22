import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Friend } from "../../friends/shared/friend.model";
import { AddFriend, RemoveFriend} from "../actions/friend.actions";

export class FriendStateModel {
  friends: Friend[]
}

@State<FriendStateModel> ({
  name: 'friends',
  defaults: {
    friends: []
  }
})

  export class FriendState {


  @Selector()
  static getFriends(state: FriendStateModel){
    return state.friends
  }


  @Action(AddFriend)
  add({getState, patchState}: StateContext<FriendStateModel>, { payload } : AddFriend){
    const state = getState();
    patchState({
      friends: [...state.friends, payload]
    })
  }

  @Action(RemoveFriend)
  remove({getState, patchState}: StateContext<FriendStateModel>, { payload } : RemoveFriend){
    patchState({
      friends: getState().friends.filter(a => a.name != payload)
    })
  }

}
