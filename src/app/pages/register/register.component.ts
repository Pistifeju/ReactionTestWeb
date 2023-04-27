import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return;
    }
  
    this.authService.signup(this.registerForm.get('email')?.value, password).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.registerForm.get('email')?.value,
        username: this.registerForm.get('username')?.value,
        games: []
      };
      this.userService.create(user).then(_ => {
        localStorage.setItem('user', JSON.stringify(cred.user));
        this.router.navigateByUrl('/main');
      }).catch(error => {
        localStorage.setItem('user', JSON.stringify(null));
      })
    }).catch(error => {
      localStorage.setItem('user', JSON.stringify(null));
    });
  }
  
}

