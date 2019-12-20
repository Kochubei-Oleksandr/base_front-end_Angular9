import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
//landing modules
import { LandingComponent } from '../components/landing/landing.component';
import { FirstSectionComponent } from '../components/landing/first-section/first-section.component';
//app modules
import { AppComponent } from './app.component';
import { NavbarComponent } from '../shared-components/navbar/navbar.component';
import { FoodPlansComponent } from '../components/food-plans/food-plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const LANDING_MODULES = [
  LandingComponent,
  FirstSectionComponent
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FoodPlansComponent,
    ...LANDING_MODULES,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
