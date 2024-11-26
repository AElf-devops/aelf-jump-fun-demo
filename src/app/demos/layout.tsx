import Footer from '@/components/Footer';

import { menuList } from '@/config/demo/configMenu';
import { MenuCustom } from '@/components/demo/Menu';

export default function HelloLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen min-w-full flex-col break-all pt-[60px] lg:pt-[80px]">
      <div className="flex min-w-full flex-1 overflow-scroll">
        <div className="flex h-full min-w-full break-all">
          <div className="hidden h-full flex-col bg-white md:flex lg:w-1/6">
            <MenuCustom menuList={menuList} />
          </div>
          <div className="size-full flex-initial border-y border-gray-100 bg-white lg:w-5/6">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
