'use client';

import { useAppSelector } from '@/app/lib/reduxToolkit/hooks';
import { selectName } from '@/app/lib/reduxToolkit/features/nickName/nickNameSlice';

export function NickNameItem() {
  const nickName = useAppSelector(selectName);
  return (
    <>
      <div>Nick Name: {nickName}</div>
    </>
  );
}
