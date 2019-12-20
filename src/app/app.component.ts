import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private _router: Router,
    private _translateService: TranslateService
  ) {
    _translateService.addLangs(['en', 'ru']);
    _translateService.setDefaultLang('en');
  }

  isHomeRoute() {
    return this._router.url === '/';
  }
}
