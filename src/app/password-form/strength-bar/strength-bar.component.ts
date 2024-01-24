import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-strength-bar',
  templateUrl: './strength-bar.component.html',
  styleUrls: ['./strength-bar.component.scss']
})
export class StrengthBarComponent {
  @Input() passwordStrength: string = '';
}