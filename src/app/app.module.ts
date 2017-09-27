import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule
} from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import {
  combineEpics,
  createEpicMiddleware
} from 'redux-observable';
import { AppComponent } from './app.component';
import {
  IAppState,
  INITIAL_STATE,
} from './store';
import { CounterActions } from './counter.actions';
import { LoadUsersEpic } from './load-users-epic';
import {
  combineReducers,
  ReducersMapObject
} from 'redux';
import { LoadPostsEpic } from './load-posts-epic';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpClientModule
  ],
  providers: [
    CounterActions,
    LoadUsersEpic,
    LoadPostsEpic
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>,
              devTools: DevToolsExtension,
              loadUsersEpic: LoadUsersEpic,
              loadPostsEpic: LoadPostsEpic,
              counterActions: CounterActions) {
    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] : [];

    const reducers: ReducersMapObject = {};
    reducers[counterActions.StateSliceName] = counterActions.reducer;
    reducers[loadUsersEpic.StateSliceName] = loadUsersEpic.reducer;
    reducers[loadPostsEpic.StateSliceName] = loadPostsEpic.reducer;
    ngRedux.configureStore(
      combineReducers<IAppState>(reducers),
      INITIAL_STATE,
      [createLogger(), createEpicMiddleware(combineEpics(loadUsersEpic.definition, loadPostsEpic.definition))],
      storeEnhancers
    )
  }
}
