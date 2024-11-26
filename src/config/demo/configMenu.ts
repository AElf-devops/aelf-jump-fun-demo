import { IMenuItemData } from '@/components/demo/Menu';

export const menuList: IMenuItemData[] = [
  {
    label: 'demo home',
    href: '/demos',
  },
  {
    label: 'with search params',
    href: '/demos?id=12345',
  },
  {
    label: 'tailwind',
    href: '/demos/tailwind',
  },
  {
    label: 'aelf-design',
    href: '/demos/aelf-design',
  },
  {
    label: 'Redux Toolkit',
    href: '/demos/redux',
  },
  {
    label: 'web login',
    href: '/demos/web-login',
  },
  {
    label: 'API All in one',
    href: '/demos/api-all-in-one',
  },
];
