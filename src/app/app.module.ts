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
  CountReducer
} from './store';
import { CounterActions } from './app.actions';
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
    LoadUsersEpic,
    CountReducer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly ngRedux: NgRedux<IAppState>,
              private readonly devTools: DevToolsExtension,
              private readonly loadUsersEpic: LoadUsersEpic,
              private readonly countReducer: CountReducer) {
    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] : [];

    const reducers: ReducersMapObject = {};
    reducers['count'] = this.countReducer.body;
    reducers[loadUsersEpic.name] = this.loadUsersEpic.reducer;
    ngRedux.configureStore(
      combineReducers<IAppState>(reducers),
      INITIAL_STATE,
      [createLogger(), createEpicMiddleware(this.loadUsersEpic.definition)],
      storeEnhancers
    )
  }
}
