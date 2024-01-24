import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { TextInputCustomComponent } from './text-input-custom/text-input-custom.component';
import { StrengthBarComponent } from './password-form/strength-bar/strength-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordFormComponent,
    TextInputCustomComponent,
    StrengthBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [StrengthBarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
