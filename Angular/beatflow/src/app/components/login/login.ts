import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login{
  loginData = { email: '', password: '' };
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
  this.api.login(this.loginData).subscribe({
    next: (user) => {
      console.log("Login Success:", user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    }
  });
}

onInputChange() {
  this.errorMessage = '';
}
}
