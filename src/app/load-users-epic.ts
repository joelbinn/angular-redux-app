import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { LoadEpic } from './load-epic';

export interface UserData {
  data: any[];
  error?: string;
}

@Injectable()
export class LoadUsersEpic extends LoadEpic<any[], UserData> {
  constructor(redux: NgRedux<UserData>, private readonly http: HttpClient) {
    super(redux);
  }

  get name() {
    return 'users';
  };

  doLoad(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  reducer = (lastState: UserData = {data: []}, action: Action) => {
    switch (action.type) {
      case this.LoadStart:
        return {data: []};
      case this.LoadSuccess:
        return {...lastState, data: <any[]>(<any>action).payload};
      case this.LoadFailed:
        return {...lastState, error: 'Something went wrong!'};
      default:
        return lastState;
    }
  };

  stateSelect = this.redux.select<UserData>('users');
}

