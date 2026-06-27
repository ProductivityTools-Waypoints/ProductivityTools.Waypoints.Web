import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  User, 
  signOut as fbSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { Observable } from 'rxjs';

// Your web app's Firebase configuration (provided by user)
const firebaseConfig = {
  apiKey: "AIzaSyAxmnZm4597RcMVQeJrby3HpuDfzYyTJoU",
  authDomain: "ptprojectsweb.firebaseapp.com",
  projectId: "ptprojectsweb",
  storageBucket: "ptprojectsweb.firebasestorage.app",
  messagingSenderId: "93484780890",
  appId: "1:93484780890:web:e7aecdc9552367dd9ff763"
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);

  // Expose user as a readonly Signal for synchronous template bindings
  user = signal<User | null>(null);
  loading = signal<boolean>(true); // True until Firebase initializes

  // Expose user as an Observable for asynchronous Router Guards
  user$ = new Observable<User | null>(subscriber => {
    return onAuthStateChanged(this.auth, subscriber);
  });

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      console.log('AuthService: state changed. User:', user?.email);
      this.user.set(user);
      this.loading.set(false);
    });
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  signOut() {
    return fbSignOut(this.auth);
  }
}
