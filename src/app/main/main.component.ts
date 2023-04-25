import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Output() changePage = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onLoginButtonClick() {
    this.changePage.emit('login');
  }
}
