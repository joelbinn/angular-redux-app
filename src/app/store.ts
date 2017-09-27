import { UserData } from './load-users-epic';
import { PostData } from './load-posts-epic';

export interface IAppState {
  count: number;
  users: UserData;
  posts: PostData;
}

export const INITIAL_STATE: IAppState = {
  count: 0,
  users: {
    data: []
  },
  posts: {
    data: []
  }
};
