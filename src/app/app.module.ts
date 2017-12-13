import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {
  MdButtonModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailComponent } from './detail.component';
import { DateInputComponent } from './date-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    DateInputComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    FlexLayoutModule,
    FormsModule
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
