import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';
import {FoodPlansComponent} from '../components/food-plans/food-plans.component';
import {AuthGuard} from '../shared/services/auth/auth.guard';
import {PersonalComponent} from '../components/personal/personal.component';
import {ROUTING_NAMES} from '../shared/constants/routing-names.const';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: ROUTING_NAMES.plans,
    component: FoodPlansComponent
  },
  {
    path: ROUTING_NAMES.personal,
    component: PersonalComponent,
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
