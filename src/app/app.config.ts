import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';  // Importa los datos de localización
import { DialogService } from 'primeng/dynamicdialog';


registerLocaleData(localeEs, 'es');


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    ConfirmationService, MessageService , DialogService, // Proporciona ConfirmationService
    { provide: LOCALE_ID, useValue: 'es-ES' } // Configurar LOCALE_ID para español
  ]
};
