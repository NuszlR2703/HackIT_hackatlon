import { CoreMenu } from 'core/types';

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'admin/dashboard',
  },
  {
    id: 'university',
    title: 'University',
    type: 'collapsible',
    icon: 'book-open',
    children: [
      {
        id: 'universities',
        title: 'Universities',
        type: 'item',
        icon: 'corner-down-right',
        url: 'admin/universities',
      },
      {
        id: 'Education Types',
        title: 'Education types',
        type: 'item',
        icon: 'corner-down-right',
        url: 'admin/education-type',
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    type: 'item',
    icon: 'briefcase',
    url: 'admin/companies',
  },
];
