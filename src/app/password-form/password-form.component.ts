import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordCheckService } from './password-check.service';
import config from '../../assets/appConfig.json';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit, OnDestroy {
  passwordStrength: string = '';
  minPasswordLength: number = config.minPasswordLength;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private passwordCheckService: PasswordCheckService) {};

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.minLength(this.minPasswordLength)])
  });


  ngOnInit() {
   this.passwordForm.get("password")?.valueChanges
    .pipe(
      takeUntil(this.destroyed$)
    ).subscribe((value: string): void => {
      this.passwordStrength = this.passwordCheckService.getPasswordStrength(value);
    });
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}