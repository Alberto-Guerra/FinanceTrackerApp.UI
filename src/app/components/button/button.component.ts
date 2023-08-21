import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text : string = "Button"
  @Input() color : string = "black"

  @Input() type : string = "button"

  @Input() onClick : Function = () => {};
}
