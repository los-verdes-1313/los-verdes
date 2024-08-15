import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr } from 'ngx-toastr';

const firebaseConfig = {
  apiKey: "AIzaSyBWgcHOdU3Yja7DM8kthEIM-q5mlQmAtDA",
  authDomain: "los-verdes-36c62.firebaseapp.com",
  projectId: "los-verdes-36c62",
  storageBucket: "los-verdes-36c62.appspot.com",
  messagingSenderId: "554381483252",
  appId: "1:554381483252:web:96f9b8a0d73ad320eb92a1"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // Toastr providers with some basic config
  ]
};


