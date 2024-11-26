import NavLinks from '@/app/ui/demos/nav-links/page';
import { NickNameItem } from '@/app/demos/redux/nickName/NickNameItem';
import { WalletConnectItem } from '@/app/demos/redux/walletConnect/WalletConnectItem';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

export type TMenuItem = Required<MenuProps>['items'][number];
export interface IMenuItemData {
  label: string;
  href: string;
}
export function MenuCustom({ menuList }: { menuList: IMenuItemData[] }) {
  const menuItems: TMenuItem[] = menuList.map((item, index) => {
    return {
      key: index,
      label: <Link href={item.href}>{item.label}</Link>,
    };
  });

  return (
    <>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        // inlineCollapsed={collapsed}
        items={menuItems}
      />
      <div className="px-4">
        <div>
          <p>Show link path here</p>
          <NavLinks />
        </div>
        <NickNameItem />
        <WalletConnectItem />
      </div>
    </>
  );
}
