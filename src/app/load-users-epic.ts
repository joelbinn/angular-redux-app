import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { LoadEpic } from './load-epic';

@Injectable()
export class LoadUsersEpic extends LoadEpic<any[], IAppState> {
  constructor(redux: NgRedux<IAppState>, private readonly http: HttpClient) {
    super(redux);
  }

  type = 'LOAD_USERS';

  doLoad(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  reduce(lastState: IAppState, action: Action): IAppState {
    return {...lastState, users: <any[]>(<any>action).payload};
  }

  stateSelect = this.redux.select<any[]>('users');

}

