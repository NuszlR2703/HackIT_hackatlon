import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreMenuService } from 'core/components/core-menu/core-menu.service';
import { AuthenticationService } from 'core/auth/service';
import { CookieService } from 'core/auth/service/cookie.service';

@Component({
  selector: '[core-menu]',
  templateUrl: './core-menu.component.html',
  styleUrls: ['./core-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreMenuComponent implements OnInit {
  currentUser: any;

  @Input()
  layout = 'vertical';

  @Input()
  menu: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {CoreMenuService} _coreMenuService
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _coreMenuService: CoreMenuService,
    private cookieService: CookieService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the menu either from the input or from the service
    this.menu = this.menu || this._coreMenuService.getCurrentMenu();

    // Subscribe to the current menu changes
    this._coreMenuService.onMenuChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.currentUser = JSON.parse(
          this.cookieService.getCookie('currentUser')
        );

        // Load menu
        this.menu = this._coreMenuService.getCurrentMenu();

        this._changeDetectorRef.markForCheck();
      });
  }
}
