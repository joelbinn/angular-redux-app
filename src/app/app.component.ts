import { Component } from '@angular/core';
import { CounterActions } from './counter.actions';
import {
  LoadUsersEpic,
  UserData
} from './load-users-epic';
import { SupervisedSubscriptions } from './supervised-subscriptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends SupervisedSubscriptions {
  count: number;
  users: any[] = [];

  constructor(private readonly counterActions: CounterActions,
              private readonly loadUsersEpic: LoadUsersEpic) {
    super();
    this.unsubscribeAtDestroy(this.counterActions.stateSlice
      .subscribe(newCount => this.count = newCount));
    this.unsubscribeAtDestroy(this.loadUsersEpic.stateSlice
      .subscribe((newUsers: UserData) => this.users = newUsers.data));
  }

  fetchUsers() {
    this.loadUsersEpic.execute();
  }

  increment() {
    this.counterActions.increment();
  }

  decrement() {
    this.counterActions.decrement();
  }
}
