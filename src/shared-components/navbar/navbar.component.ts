import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isLanding: boolean;
  public isSticky: boolean = false;

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
}