// Build trigger: 2026-06-25T21:30:00 (Forces unique build hash for deployment)
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProductivityTools.Waypoints.Web');

  // Expose reactive auth signals directly to the template via getters
  get user() { return this.authService.user; }
  get loading() { return this.authService.loading; }

  constructor(private authService: AuthService, private router: Router) {}

  onSignOut() {
    this.authService.signOut().then(() => {
      console.log('App: User signed out successfully, redirecting to /home');
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error('App: Error signing out:', error);
    });
  }
}
