import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-main',
  templateUrl: './title-main.component.html',
  styleUrls: ['./title-main.component.css']
})
export class TitleMainComponent {

  @Input() title: string = "a";


  ngOnInit(): void {
  }
}
