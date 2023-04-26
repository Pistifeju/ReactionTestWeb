import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  imageSrc = 'assets/background-img.png';
  gameStatus: 'start' | 'running' | 'stop' | 'win' | 'lose' = 'start';
  reactionTimeStart: number = 0;
  reactionTime: number = 0;
  reactionText = `You have the reactions of a 31 year old.\n With the reaction time of reactionTime ${this.reactionTime}`;

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:keydown.space', ['$event'])
  onSpacePress(event: KeyboardEvent): void {
    event.preventDefault();
    
    switch (this.gameStatus) {
      case 'start':
        this.startGame();
        break;
      case 'running':
        this.stopTimer();
        break;
      case 'stop':
        this.gameStatus = 'win';
        this.calculateReactionTime();
      break;
      case 'win':
        this.resetGame();
        break;
      case 'lose':
        this.resetGame();
        break;
      default:
        break;
    } 
  }

  startGame() {
    this.imageSrc = 'assets/background.gif';
    this.gameStatus = 'running';
    this.startTimer();
  }

  startTimer() {
    const delay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    setTimeout(() => {
      this.reactionTimeStart = new Date().getTime();
      if (this.gameStatus === 'running') {
        this.gameStatus = 'stop';
      }
    }, delay);
  }

  stopTimer() {
    if (this.gameStatus === 'running') {
      this.gameStatus = 'lose';
      this.imageSrc = 'assets/background-img.png';
    }
  }

  calculateReactionTime(): void {
    const currentTime = new Date().getTime();
    this.reactionTime = currentTime - this.reactionTimeStart;
    this.imageSrc = 'assets/background-img.png';
    if (this.reactionTime < 150) {
      this.reactionText = `Are you even human?\n With the reaction time of ${this.reactionTime}`;
    }
    else if (this.reactionTime < 200) {
      this.reactionText = `You have the reactions of a 18 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 300) {
      this.reactionText = `You have the reactions of a 30 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 400) {
      this.reactionText = `You have the reactions of a 40 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 500) {
      this.reactionText = `You have the reactions of a 50 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 600) {
      this.reactionText = `You have the reactions of a 60 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 700) {
      this.reactionText = `You have the reactions of a 70 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 800) {
      this.reactionText = `You have the reactions of a 80 year old.\n With the reaction time of ${this.reactionTime}`;
    } else if (this.reactionTime < 900) {
      this.reactionText = `You have the reactions of a 90 year old.\n With the reaction time of ${this.reactionTime}`;
    } else {
      this.reactionText = `Are you dead m8, you didn't even react.\n With the reaction time of ${this.reactionTime}`;
    }
  }

  resetGame() {
    this.reactionTime = 0;
    this.gameStatus = 'start';
  }
}
