import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//landing modules
import { LandingComponent } from '../components/landing/landing.component';
import { FirstSectionComponent } from '../components/landing/first-section/first-section.component';
//app modules
import { AppComponent } from './app.component';
import { NavbarComponent } from '../shared-components/navbar/navbar.component';
import { LanguageSwitchingComponent } from '../shared-components/navbar/language-switching/language-switching.component';
import { PdfModalDialogComponent } from '../shared-components/pdf-modal-dialog/pdf-modal-dialog.component';
import { FoodPlansComponent } from '../components/food-plans/food-plans.component';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegistrationComponent} from '../components/auth/registration/registration.component';
import {CapitalizePipe} from '../shared/pipes/capitalize.pipe';
import {LanguageService} from '../shared/services/language.service';
import {LogNotificationService} from '../shared/services/log-notification.service';
import {TokenInterceptor} from '../shared/interceptors/token.interceptor';
import {ApiConfigInterceptor} from '../shared/interceptors/api-config.interceptor';
import {ServerValidationFormService} from '../shared/services/server-validation-form.service';

const LANDING_MODULES = [
  LandingComponent,
  FirstSectionComponent
];
const MAIN_COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegistrationComponent,
  FoodPlansComponent
];
const SHARED_COMPONENTS = [
  NavbarComponent,
  PdfModalDialogComponent,
  LanguageSwitchingComponent,
];
const SHARED_PIPES = [
  CapitalizePipe
];
const SHARED_SERVICES = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiConfigInterceptor,
    multi : true
  },
  LanguageService,
  LogNotificationService,
  ServerValidationFormService,
];
const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    ...LANDING_MODULES,
    ...MAIN_COMPONENTS,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...ANGULAR_MATERIAL_MODULES
  ],
  providers: [
    ...SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
