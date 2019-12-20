import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
//landing modules
import { LandingComponent } from '../components/landing/landing.component';
import { FirstSectionComponent } from '../components/landing/first-section/first-section.component';
//app modules
import { AppComponent } from './app.component';
import { NavbarComponent } from '../shared-components/navbar/navbar.component';
import { FoodPlansComponent } from '../components/food-plans/food-plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from '../components/login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const LANDING_MODULES = [
  LandingComponent,
  FirstSectionComponent
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
