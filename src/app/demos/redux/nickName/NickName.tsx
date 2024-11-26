'use client';
import { useState } from 'react';
import { Button, Input } from 'aelf-design';
import { Space } from 'antd';

import {
  changeName,
  getRandomNumberName,
  selectName,
} from '@/app/lib/reduxToolkit/features/nickName/nickNameSlice';

import { useAppDispatch, useAppSelector } from '@/app/lib/reduxToolkit/hooks';

export const NickName = () => {
  const dispatch = useAppDispatch();
  const nickName = useAppSelector(selectName);
  const [myNickName, setMyNickName] = useState<string>();

  return (
    <div>
      <p>Nick Name: {nickName}</p>
      <div className="my-8">
        <Button onClick={() => dispatch(getRandomNumberName())}>
          Get Random Number Nick Name
        </Button>
      </div>
      <div>
        <Input
          placeholder="Input your Nick Name"
          size="middle"
          onChange={(e) => {
            setMyNickName(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (!myNickName) {
              alert('Please input nick name or get random name');
              return;
            }
            dispatch(changeName(myNickName));
          }}
        >
          Change name
        </Button>
      </div>
    </div>
  );
};
