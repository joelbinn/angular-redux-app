import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { Action } from 'redux';

@Injectable()
export class CounterActions {
  constructor(private readonly redux: NgRedux<IAppState>) {
  }

  increment(): void {
    this.redux.dispatch(IncrementActionDef.create());
  }

  decrement(): void {
    this.redux.dispatch(DecrementActionDef.create());
  }

  fetchUsers(): void {
    this.redux.dispatch(FetchUsersActionDef.create());
  }
}

export abstract class IncrementActionDef {
  static readonly TYPE = 'INCREMENT';
  static create(): Action {
    return {
      type: IncrementActionDef.TYPE
    };
  }
}

export abstract class DecrementActionDef {
  static readonly TYPE = 'DECREMENT';

  static create(): Action {
    return {
      type: DecrementActionDef.TYPE
    };
  }
}

export abstract class FetchUsersActionDef {
  static readonly TYPE = 'FETCH_USERS';

  static create(): Action {
    return {
      type: FetchUsersActionDef.TYPE
    };
  }
}

export abstract class FetchUsersFailedActionDef {
  static readonly TYPE = 'FETCH_USERS_FAILED';

  static create(): Action {
    return {
      type: FetchUsersFailedActionDef.TYPE
    };
  }
}

export interface UsersAction extends Action {
  users: any[];
}

export abstract class FetchUsersSuccessActionDef {
  static readonly TYPE = 'FETCH_USERS_SUCCESS';

  static create(users: any[]): UsersAction {
    return {
      type: FetchUsersSuccessActionDef.TYPE,
      users: users
    };
  }
}
