'use client';
// import { HashAddress } from 'aelf-design';
// import { Button } from 'antd';
// import { Button } from 'aelf-design';
import { Button } from 'antd-mobile';
/**
 * <AntdRegistry>
 * If you are using the App Router in Next.js and using antd as your component library,
 * to make the antd component library work better in your Next.js application and provide a better user experience,
 * you can try using the following method to extract
 * and inject antd's first-screen styles into HTML to avoid page flicker.
 * https://ant.design/docs/react/use-with-next
 **/
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Page() {
  return (
    <>
      <p>
        Get more components from{' '}
        <a href="https://ant.design/">https://ant.design/</a>
      </p>
      <Input placeholder="Basic usage" prefix={<UserOutlined />} />
      <p>
        Get more components from{' '}
        <a href="https://aelf-design.vercel.app">
          https://aelf-design.vercel.app
        </a>
      </p>
      {/*<HashAddress address="2DKgy7GafbrYWGnhSC3iSYgM9ZfudYS2KLLr1rDPLF9nZfWA6G" />*/}
      {/*<HashAddress address="2DKgy7GafbrYWGnhSC3iSYgM9ZfudYS2KLLr1rDPLF9nZfWA6G" chain="tDVV" />*/}
      {/*<HashAddress address="2DKgy7GafbrYWGnhSC3iSYgM9ZfudYS2KLLr1rDPLF9nZfWA6G" chain="tDVW" />*/}
      <Button>Test antd-mobile</Button>
      {/*<Button>Test aelf-design</Button>*/}
    </>
  );
}
