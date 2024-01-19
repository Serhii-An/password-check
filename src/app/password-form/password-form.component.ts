import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPassParams }  from '../shared/interfaces';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  symbolRegex: RegExp = new RegExp(/[!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]/);
  letterRegex: RegExp = new RegExp(/[\p{L}]/u);
  digitRegex: RegExp = new RegExp(/[\d]/);
  minPasswordLength: number = 8;
  passwordStrenght: number = 0;

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.minLength(this.minPasswordLength)])
  });

  passwordStrenghtTypes = new Map<number, string>([
    [0, ''],
    [1, 'easy'],
    [2, 'medium'],
    [3, 'strong']
  ]);  


  calculatePasswordStrength(str: string): void {
    if (str.length < this.minPasswordLength) {
      this.passwordStrenght = 0;
      return;
    };
    const passwordParams: IPassParams = {
      hasSymbol: this.testPassowrd(str, this.symbolRegex),
      hasLetter: this.testPassowrd(str, this.letterRegex),
      hasDigit: this.testPassowrd(str, this.digitRegex)
    }


    this.passwordStrenght = Object.values(passwordParams).reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );
  }


  testPassowrd(str: string, regex: RegExp): number {
    return regex.test(str) ? 1 : 0;
  }


  ngOnInit() {
    this.passwordForm.get("password")?.valueChanges.subscribe((value: string) => {
      this.calculatePasswordStrength(value);
    });
  }
}
