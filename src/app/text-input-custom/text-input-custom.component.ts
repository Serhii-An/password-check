import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordCheckService } from '../shared/password-check.service';

@Component({
  selector: 'app-text-input-custom',
  templateUrl: './text-input-custom.component.html',
  styleUrls: ['./text-input-custom.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputCustomComponent),
        multi: true
    }
]
})

export class TextInputCustomComponent implements ControlValueAccessor {
  constructor(private passwordCheckService: PasswordCheckService) {};

  @Input() placeholder: string = '';
  public value: string | undefined;
  
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  public onInputValueChange(event: Event): void {
    const targetDivElement = event.target as HTMLInputElement;
    const value = targetDivElement.value;
    this.onChange(value);
}

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
      this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
  }
}