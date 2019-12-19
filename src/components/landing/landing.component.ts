import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(
    private _router: Router
  ) {

  }
  goToLoginPage() {
    this._router.navigate(['plans']);
  }
}