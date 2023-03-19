import { Component, OnInit } from '@angular/core';

// Interface
interface notification {
  messages: [];
  systemMessages: [];
  system: Boolean;
}

@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html',
})
export class NavbarNotificationComponent implements OnInit {
  // Public
  public notifications: notification = {
    messages: [],
    systemMessages: [],
    system: true,
  };

  /**
   *
   * @param {NotificationsService} _notificationsService
   */
  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}
}
