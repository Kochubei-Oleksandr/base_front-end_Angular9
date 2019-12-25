import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LoginComponent} from '../../components/auth/login/login.component';
import {MatDialog} from '@angular/material';
import {RegistrationComponent} from '../../components/auth/registration/registration.component';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isLanding: boolean;
  public isSticky: boolean = false;

  constructor (
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _translateService: TranslateService,
  ) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll():void {
    if (this.isLanding === true) {
      this.isSticky = window.pageYOffset >= 1;
    }
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }
  logout() {
    if (confirm(
      this._translateService.instant('Are you sure you want to go out?')
    )) {
      this._authService.doLogout();
    }
  }
  getClassDecorator(mainClass: string): string {
    return this.isLanding
      ? this.isSticky ? (mainClass + '--sticky') : (mainClass + '--no-sticky')
      : (mainClass + '--no-landing');
  }
  openLoginDialog() {
    this._dialog.open(LoginComponent, {
      width: '350px'
    });
  }
  openRegistrationDialog() {
    this._dialog.open(RegistrationComponent, {
      width: '350px'
    });
  }
  goToHomePage() {
    this._router.navigate(['/']);
  }
  goToOrdersHistory() {
    // this._router.navigate(['/']);
  }
  goToDiary() {
    // this._router.navigate(['/']);
  }
  goToProgress() {
    // this._router.navigate(['/']);
  }
  goToPersonal() {
    // this._router.navigate(['/personal']);
  }
}