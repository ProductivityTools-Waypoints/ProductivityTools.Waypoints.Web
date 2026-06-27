import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage = signal<string | null>(null);
  loading = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {}

  signInWithGoogle() {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.signInWithGoogle()
      .then((result) => {
        console.log('Google Sign-In success:', result.user.email);
        this.router.navigate(['/route-list']);
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
        this.errorMessage.set(this.getFriendlyErrorMessage(error.code));
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was closed before completion. Please try again.';
      case 'auth/popup-blocked':
        return 'Sign-in popup was blocked by your browser. Please enable popups for this site.';
      case 'auth/cancelled-popup-request':
        return 'Only one sign-in window can be open at a time.';
      case 'auth/operation-not-allowed':
        return 'Google Sign-In is not enabled in your Firebase Console under Auth providers.';
      default:
        return 'An error occurred during Google Sign-In. Please try again.';
    }
  }
}
