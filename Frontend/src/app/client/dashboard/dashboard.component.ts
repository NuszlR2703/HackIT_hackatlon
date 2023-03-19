import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from 'core/services/config.service';
import { CoreTranslationService } from 'core/services/translation.service';
import { User } from 'core/auth/models';
import { AuthenticationService } from 'core/auth/service';
import { CookieService } from 'core/auth/service/cookie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;
  isClient: boolean;
  loading: boolean = false;

  constructor(private _cookieService: CookieService) {}

  /**
   * On init
   */
  ngOnInit(): void {
    // get the currentUser details from cookie
    this.currentUser = JSON.parse(
      this._cookieService.getCookie('currentUser')
    );
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {}
}
