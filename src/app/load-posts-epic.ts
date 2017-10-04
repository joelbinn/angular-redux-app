import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { LoadEpic } from './load-epic';

export interface PostData {
  data: any[];
  error?: string;
}

export const INITIAL_POST_DATA: PostData = {
  data: []
};

@Injectable()
export class LoadPostsEpic extends LoadEpic<any[], PostData> {
  constructor(redux: NgRedux<PostData>, private readonly http: HttpClient) {
    super(redux);
  }

  get StateSliceName() {
    return 'posts';
  }


  doLoad(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  reducer = (lastState: PostData = {data: []}, action: Action) => {
    switch (action.type) {
      case this.LoadStart:
        return {data: []};
      case this.LoadSuccess:
        return {...lastState, data: <any[]>(<any>action).payload};
      case this.LoadFailed:
        return {...lastState, error: 'Something went wrong! Could not load posts :-('};
      default:
        return lastState;
    }
  };

  stateSlice = this.redux.select<PostData>(this.StateSliceName);
}

