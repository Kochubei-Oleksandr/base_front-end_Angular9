import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'first-section',
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.scss']
})
export class FirstSectionComponent {
  constructor(
    private _router: Router
  ) {

  }
  goToLoginPage() {
    this._router.navigate(['plans']);
  }
}