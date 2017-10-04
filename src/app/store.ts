import {
  INITIAL_USER_DATA,
  UserData
} from './load-users-epic';
import {
  INITIAL_POST_DATA,
  PostData
} from './load-posts-epic';

export interface IAppState {
  count: number;
  users: UserData;
  posts: PostData;
}

export const INITIAL_STATE: IAppState = {
  count: 0,
  users: INITIAL_USER_DATA,
  posts: INITIAL_POST_DATA
};
