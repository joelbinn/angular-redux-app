import { UserData } from './load-users-epic';

export interface IAppState {
  count: number;
  users: UserData;
}

export const INITIAL_STATE: IAppState = {
  count: 0,
  users: {
    data: []
  }
};
