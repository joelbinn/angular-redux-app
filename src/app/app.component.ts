import { Component } from '@angular/core';
import { CounterActions } from './counter.actions';
import {
  LoadUsersEpic,
  UserData
} from './load-users-epic';
import { SupervisedSubscriptions } from './supervised-subscriptions';
import {
  LoadPostsEpic,
  PostData
} from './load-posts-epic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends SupervisedSubscriptions {
  count: number;
  myDate: Date;
  users: any[] = [];
  posts: any[] = [];

  constructor(private readonly counterActions: CounterActions,
              private readonly loadUsersEpic: LoadUsersEpic,
              private readonly loadPostsEpic: LoadPostsEpic,
              ) {
    super();
    this.unsubscribeAtDestroy(this.counterActions.stateSlice
      .subscribe(newCount => this.count = newCount));
    this.unsubscribeAtDestroy(this.loadUsersEpic.stateSlice
      .subscribe((newUsers: UserData) => this.users = newUsers.data));
    this.unsubscribeAtDestroy(this.loadPostsEpic.stateSlice
      .subscribe((newPosts: PostData) => this.posts = newPosts.data));
  }

  fetchUsers() {
    this.loadUsersEpic.execute();
  }

  fetchPosts() {
    this.loadPostsEpic.execute();
  }

  increment() {
    this.counterActions.increment();
  }

  decrement() {
    this.counterActions.decrement();
  }

  getObservableStuff():Observable<any> {
    return Observable.of(1,2,3,4,5,6,7,8,9);
  }
}
