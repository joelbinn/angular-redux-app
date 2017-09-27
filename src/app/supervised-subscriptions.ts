import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export abstract class SupervisedSubscriptions implements OnDestroy {
  private subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  protected unsubscribeAtDestroy(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }
}
