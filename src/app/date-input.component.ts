import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import date from 'date-and-time';

export const DATE_INPUT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateInputComponent),
  multi: true
};

@Component({
  selector: 'jb-date-input',
  providers: [DATE_INPUT_ACCESSOR],
  host: {
    '(blur)': 'propagateTouched()',
  },
  template: `
    <input type="text"
           [value]="dateStr"
           (input)="updateDate($event)"/>`
})
export class DateInputComponent implements ControlValueAccessor {
  @Input()
  format: string = 'YYYY-MM-DD';

  dateStr: string;

  private dateValue: Date;
  private propagateChange: (any) => void;
  private propagateTouched: () => void;

  writeValue(newDateValue: Date): void {
    console.debug('writeValue:', newDateValue);
    this.dateStr = newDateValue && date.format(newDateValue, this.format) || null;
  }

  registerOnChange(propagateChange: (any) => void): void {
    this.propagateChange = propagateChange;
  }

  registerOnTouched(propagateTouched: () => void): void {
    this.propagateTouched = propagateTouched;
  }

  updateDate(event: Event) {
    const inputValue = (<HTMLInputElement>event.target).value;
    console.debug('updateDate:', inputValue);
    const actualFormat = VALID_FORMATS.find(f => date.isValid(inputValue, f));
    if (actualFormat) {
      let parsedDate = date.parse(inputValue, actualFormat,true);
      this.dateValue = parsedDate;
    } else {
      this.dateValue = undefined;
    }
    this.propagateChange(this.dateValue);
  }
}

const VALID_FORMATS=[
  'YYYY',
  'YYYY-MM',
  'YYYY-MM-DD'
];
