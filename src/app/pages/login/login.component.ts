import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.authService.login(email, password).then(cred => {
      localStorage.setItem('user', JSON.stringify(cred.user));
      this.router.navigateByUrl('/main');
    }).catch(error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify("null"));
    });
  }
}
