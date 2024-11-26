import Image from 'next/image';
import desktopPic from '../../../public/demos/desktop.png';
import mobilePic from '../../../public/demos/mobile.png';
export default function ImageDemo() {
  return (
    <>
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        {/* Add Hero Images Here */}
        <Image
          src={desktopPic}
          width={1000}
          height={760}
          className="hidden md:block"
          alt="showing desktop version"
        />
        <Image
          src={mobilePic}
          width={560}
          height={620}
          className="block md:hidden"
          alt="showing mobile version"
        />
      </div>
    </>
  );
}
