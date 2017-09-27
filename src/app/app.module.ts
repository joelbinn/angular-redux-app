import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule
} from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
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
    LoadUsersEpic
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly ngRedux: NgRedux<IAppState>,
              private readonly devTools: DevToolsExtension,
              private readonly loadUsersEpic: LoadUsersEpic,
              private readonly counterActions: CounterActions) {
    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] : [];

    const reducers: ReducersMapObject = {};
    reducers[counterActions.StateSliceName] = this.counterActions.reducer;
    reducers[loadUsersEpic.StateSliceName] = this.loadUsersEpic.reducer;
    ngRedux.configureStore(
      combineReducers<IAppState>(reducers),
      INITIAL_STATE,
      [createLogger(), createEpicMiddleware(this.loadUsersEpic.definition)],
      storeEnhancers
    )
  }
}
