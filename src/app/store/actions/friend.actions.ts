import { Friend } from "../../friends/shared/friend.model";

export class AddFriend {
  static readonly type = '[Friend] add'

  constructor (public payload: Friend) {}

}

export class RemoveFriend {
  static readonly type = '[Friend] remove'

  constructor (public payload: string) {}

}

