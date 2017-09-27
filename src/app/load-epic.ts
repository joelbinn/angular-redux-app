import { ActionsObservable } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class LoadEpic<P, S> {
  constructor(protected readonly redux: NgRedux<S>) {
  }

  abstract readonly name: string;

  readonly LoadStart: string = this.name.toUpperCase() + '_LOAD_START';

  readonly LoadSuccess: string = this.name.toUpperCase() + '_LOAD_SUCCESS';

  readonly LoadFailed: string = this.name.toUpperCase() + '_LOAD_FAILED';

  readonly definition = (action$: ActionsObservable<any>) => {
    return action$.ofType(this.LoadStart)
      .mergeMap(() => {
        return this.doLoad()
          .map((p: P) => ({type: this.LoadSuccess, payload: p}))
          .catch(error => Observable.of({type: this.LoadFailed}))
      });
  };

  execute() {
    this.redux.dispatch({type: this.LoadStart});
  }

  abstract doLoad(): Observable<P>;

  abstract reducer: (lastState: S, action: Action) => S;

  abstract stateSelect: Observable<S>
}

