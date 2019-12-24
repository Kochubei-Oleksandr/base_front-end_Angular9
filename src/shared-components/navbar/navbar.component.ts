import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LoginComponent} from '../../components/auth/login/login.component';
import {MatDialog} from '@angular/material';
import {RegistrationComponent} from '../../components/auth/registration/registration.component';
import {Router} from '@angular/router';

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
    private _dialog: MatDialog
  ) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll():void {
    if (this.isLanding === true) {
      this.isSticky = window.pageYOffset >= 1;
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
}