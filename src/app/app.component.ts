import { Component } from '@angular/core';
import { IAppState } from "./store";
import { CounterActions } from './app.actions';
import { NgRedux } from '@angular-redux/store';
import { LoadUsersEpic } from './load-users-epic';
import { SupervisedSubscriptions } from './supervised-subscriptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends SupervisedSubscriptions {
  count: number;
  users: any[] = [];

  constructor(private readonly ngRedux: NgRedux<IAppState>,
              private readonly actions: CounterActions,
              private readonly loadUsersEpic: LoadUsersEpic) {
    super();
    this.unsubscribeAtDestroy(ngRedux.select<number>('count')
      .subscribe(newCount => this.count = newCount));
    this.unsubscribeAtDestroy(this.loadUsersEpic.stateSelect
      .subscribe(newUsers => this.users = newUsers));
  }

  fetchUsers() {
    this.loadUsersEpic.execute();
  }

  increment() {
    this.actions.increment();
  }

  decrement() {
    this.actions.decrement();
  }
}
