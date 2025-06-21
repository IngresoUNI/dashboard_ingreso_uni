import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
  @Input() label: string='';
  @Input() value: string='';
  @Input() icon: string='';
  @Input() color1: string='';
  @Input() color2: string='';
}
