import { Injectable } from '@angular/core';
import { IPassParams } from '../shared/interfaces';
import { TestRegExpService } from '../shared/test-reg-exp.service';
import config from '../../assets/appConfig.json';

@Injectable({
  providedIn: 'root'
})
export class PasswordCheckService {
  constructor(private testRegExpService: TestRegExpService) { }
  passwordStrength: string = '';

  getPasswordStrength(str: string): string {
    let passwordStrengthValue: number | undefined;

    if (str.length > 0 && str.length < config.minPasswordLength) {
      passwordStrengthValue = 0;
    } 

    if (str.length >= config.minPasswordLength) {
      const passwordParams: IPassParams = this.setPasswordParams(str);
      passwordStrengthValue = this.calculatePasswordStrengthValue(passwordParams);
    }

    switch (passwordStrengthValue) {
      case 0:
        this.passwordStrength = 'error';
        break;
      case 1:
        this.passwordStrength = 'easy';
        break;
      case 2:
        this.passwordStrength = 'medium';
        break;
      case 3:
        this.passwordStrength = 'strong';
        break;
      default:
        this.passwordStrength = '';
    }

    return this.passwordStrength;
  }


  setPasswordParams(str: string): IPassParams {
    const params: IPassParams = {
      hasSymbol: this.testRegExpService.testString(str, config.regExps.symbolRegexp),
      hasLetter: this.testRegExpService.testString(str, config.regExps.letterRegexp),
      hasDigit: this.testRegExpService.testString(str, config.regExps.digitRegexp)
    }
    return params;
  }


  calculatePasswordStrengthValue(params: IPassParams): number {
    return Object.values(params).reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );
  }
}
