import { ActionsObservable } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IAppState } from './store';
import { Action } from 'redux';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class LoadEpic<P, S> {
  constructor(protected readonly redux: NgRedux<S>) {
  }

  abstract readonly type: string;

  readonly loadSuccessType: string = this.type + '_LOAD_SUCCESS';

  readonly loadFailedType: string = this.type + '_LOAD_FAILED';

  readonly definition = (action$: ActionsObservable<any>) => {
    return action$.ofType(this.type)
      .mergeMap(() => {
        return this.doLoad()
          .map((p: P) => ({type: this.loadSuccessType, payload: p}))
          .catch(error => Observable.of({type: this.loadFailedType}))
      });
  };

  execute() {
    this.redux.dispatch({type: this.type});
  }

  abstract doLoad(): Observable<P>;

  abstract reduce(lastState: IAppState, action: Action): S;

  abstract stateSelect: Observable<P>
}

