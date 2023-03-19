import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from 'core/services/config.service';
import { CoreTranslationService } from 'core/services/translation.service';
import { User } from 'core/auth/models';
import { AuthenticationService } from 'core/auth/service';
import { CookieService } from 'core/auth/service/cookie.service';
import { first } from 'rxjs/operators';
import { CustomToastrService } from 'core/services/toastr.service';

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

  constructor(private _authenticationService: AuthenticationService) {
    this.currentUser = this._authenticationService.currentUserValue;
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // get the currentUser details from cookie
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {}
}
