import { CoreMenu } from 'core/types';

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'item',
    icon: 'home',
    url: 'client/dashboard',
  },
  {
    id: 'mainProfile',
    title: 'My Profile',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'item',
    icon: 'eye',
    url: 'client/my-profile',
  },
];
