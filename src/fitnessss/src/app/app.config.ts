import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations }from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TrainingService } from './training/training.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    AuthService,
    AuthGuard,
    TrainingService, 
    provideFirebaseApp((injector) => initializeApp({
      "projectId": process.env['NG_APP_PROJECTID'],
      "appId": process.env['NG_APP_APPID'],
      "storageBucket": process.env['NG_APP_STORAGEBUCKET'],
      "apiKey": process.env['NG_APP_APIKEY'],
      "authDomain": process.env['NG_APP_AUTHDOMAIN'],
      "messagingSenderId": process.env['NG_APP_MESSAGINGSENDERID'],
      "measurementId": process.env['NG_APP_MEASUREMENTID']
    })),
       provideAuth(() => getAuth()), 
       provideAnalytics(() => getAnalytics()), 
       ScreenTrackingService, 
       UserTrackingService, 
       provideFirestore(() => getFirestore())
  ]
};
