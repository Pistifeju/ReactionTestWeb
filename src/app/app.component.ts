import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactionGameWeb';
  signedIn = false;
  loggedInUser?: firebase.default.User | null;
  page = '';
  routes: Array<string> = [];
  
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];
    
    this.authService.isUserLoggedIn().subscribe(user => {
      this.signedIn = user !== null;
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  goToLogin() {
    this.page = 'register';
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.page = 'login';
    this.router.navigate(['/register']);
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully.');
      localStorage.setItem('user', JSON.stringify(null));
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error(error);
    });
  }
  
}
