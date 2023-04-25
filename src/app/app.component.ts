import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactionGameWeb';

  page = '';
  routes: Array<string> = [];
  
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }
}
