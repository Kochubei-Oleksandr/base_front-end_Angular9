import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
//landing modules
import { LandingComponent } from '../components/landing/landing.component';
import { FirstSectionComponent } from '../components/landing/first-section/first-section.component';
//app modules
import { AppComponent } from './app.component';
import { NavbarComponent } from '../shared-components/navbar/navbar.component';
import { PdfModalDialogComponent } from '../shared-components/pdf-modal-dialog/pdf-modal-dialog.component';
import { FoodPlansComponent } from '../components/food-plans/food-plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegistrationComponent} from '../components/auth/registration/registration.component';

const LANDING_MODULES = [
  LandingComponent,
  FirstSectionComponent
];
const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    PdfModalDialogComponent,
    FoodPlansComponent,
    ...LANDING_MODULES,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
