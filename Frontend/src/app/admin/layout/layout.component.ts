import { Component, OnInit } from '@angular/core';
import { CoreMenuService } from 'core/components/core-menu/core-menu.service';
import { CoreConfigService } from 'core/services/config.service';
import { menu } from './menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  menu;

  constructor(
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService
  ) {
    // Get the application main menu
    this.menu = menu;

    this._coreConfigService.config = {
      layout: {
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: true,
      },
    };

    this.menu = menu;
    // Register the menu to the menu service
    this._coreMenuService.register('admin', this.menu);
    // Set the main menu as our current menu
    this._coreMenuService.setCurrentMenu('admin');
  }

  ngOnInit(): void {}
}
