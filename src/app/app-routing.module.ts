import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';
import {FoodPlansComponent} from '../components/food-plans/food-plans.component';
import {AuthGuard} from '../shared/services/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'plans',
    component: FoodPlansComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
