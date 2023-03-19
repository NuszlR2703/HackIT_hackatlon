import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'core/auth/service/cookie.service';
import { CoreConfigService } from 'core/services/config.service';
import { CustomToastrService } from 'core/services/toastr.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Subject } from 'rxjs';
import Parallax from 'parallax-js';

declare var anime: any;

@HostListener('window:scroll', ['$event'])
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  navbarOpen = false;
  flip1: string = 'inactive';
  flip2: string = 'inactive';
  flip3: string = 'inactive';
  isSticky = false;
  public showReportIcons = true;

  constructor(private _coreConfigService: CoreConfigService) {
    window.onscroll = () => {
      var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

      var result = (x * 20) / 100;
      if (window.pageYOffset > result) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    };

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: false,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
    setTimeout(() => {
      var parallaxInstance = new Parallax(
        document.getElementById('scene'),
        {
          relativeInput: true,
        }
      );
      var parallaxInstance = new Parallax(
        document.getElementById('responsive-image'),
        {
          relativeInput: true,
        }
      );
    }, 250);
  }

  ngOnInit(): void {}

  makeActive(param: number) {
    this['flip' + param] = 'active';
  }

  makeInactive(param: number) {
    this['flip' + param] = 'inactive';
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
