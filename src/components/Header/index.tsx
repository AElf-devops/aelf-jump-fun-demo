'use client';
import React from 'react';
import Image from 'next/image';
import LogoSVG from '@/assets/img/logo.svg';
import Link from 'next/link';
import { IMenuItem } from '@/components/Header/type';

const MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Demos',
    schema: '/demos',
  },
];

export default function Header() {
  return (
    // <section className="sticky top-0 left-0 z-[100] flex-shrink-0 px-4 lg:px-10 bg-white border-b-1 border-b-gray-300">
    <section className="border-b-1 fixed left-0 top-0 z-[100] w-full shrink-0 border-b-gray-300 bg-white px-4 lg:px-10">
      <div className="mx-auto flex h-[60px] w-full items-center justify-between lg:h-[80px]">
        <Link
          href="/"
          className="flex flex-1 items-center justify-start overflow-hidden"
        >
          <Image
            src={LogoSVG}
            alt="logo"
            className="h-[24px] w-[138px] lg:h-[32px] lg:w-[184px]"
          />
        </Link>
        <span className="flex flex-row items-center space-x-8 xl:space-x-16">
          {MENU_ITEMS.map((item, index) => {
            const { title, schema } = item;
            return (
              <Link href={schema} key={index}>
                {title}
              </Link>
            );
          })}
        </span>
      </div>
    </section>
  );
}
