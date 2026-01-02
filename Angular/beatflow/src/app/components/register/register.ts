import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // 1. Data Object for Backend
  user = {
    name: '',
    email: '',
    password: '',
    role: 'USER'
  };

  // 2. Logic Variables
  confirmPassword: string = '';
  otpSent: boolean = false; // Controls which form to show
  userOtp: string = '';     // Stores the 6-digit code entered by user

  constructor(private api: ApiService, private router: Router) {}

  // PHASE 1: Send the Email OTP
  requestOtp() {
    // Basic check before sending email
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.api.sendOtp(this.user.email).subscribe({
      next: () => {
        this.otpSent = true;
        alert('OTP sent to your email! Please check your inbox.');
      },
      error: (err) => {
        console.error('OTP Error:', err);
        alert('Failed to send OTP. Is your Backend running?');
      }
    });
  }

  // PHASE 2: Verify OTP and Save User to MySQL
  onRegister() {
    // Combine User data and OTP into one package
    const finalPayload = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      otp: this.userOtp
    };

    this.api.register(finalPayload).subscribe({
      next: (response) => {
        console.log('Success:', response);
        alert('Registration Successful! Redirecting to login...');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration Error:', err);
        alert('Invalid OTP or Email already exists!');
      }
    });
  }
}
