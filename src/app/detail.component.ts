import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'detail',
  template: `<p><em>Value:</em> {{value}}</p>
  <button (click)="step()">Steppa</button>`
})
export class DetailComponent {
  @Input()
  value: number;
  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  step() {
    this.value++;
    this.valueChange.emit(this.value);
  }
}
