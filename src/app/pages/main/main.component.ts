import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  imageSrc = 'assets/background-img.png';

  constructor() {}

  ngOnInit(): void {}
}
