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
  RootReducer
} from './store';
import { CounterActions } from './app.actions';
import { LoadUsersEpic } from './load-users-epic';

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
    RootReducer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly ngRedux: NgRedux<IAppState>,
              private readonly devTools: DevToolsExtension,
              private readonly loadUsersEpic: LoadUsersEpic,
              private readonly rootReducer: RootReducer) {
    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] : [];

    ngRedux.configureStore(
      rootReducer.body,
      INITIAL_STATE,
      [createLogger(), createEpicMiddleware(this.loadUsersEpic.definition)],
      storeEnhancers
    )
  }
}
