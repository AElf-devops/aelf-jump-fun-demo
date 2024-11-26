'use client';
import React from 'react';
import { Counter } from './counter/Counter';
import { NickName } from './nickName/NickName';
import { DownOutlined } from '@ant-design/icons';
import { Tabs } from 'aelf-design';
import { Space } from 'antd';

const tabItems = [
  {
    key: '1',
    label: 'Counter',
    children: <Counter />,
    icon: <DownOutlined />,
  },
  {
    key: '2',
    label: 'Same Counter',
    children: (
      <>
        Counter data is the same
        <Counter />
      </>
    ),
    icon: <DownOutlined />,
  },
  {
    key: '3',
    label: 'Nick Name',
    children: (
      <>
        <NickName />
      </>
    ),
    icon: <DownOutlined />,
  },
];

export default function ReduxDemoPage() {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Tabs defaultActiveKey="1" items={tabItems} />
      {/*<Tabs*/}
      {/*  size="small"*/}
      {/*  defaultActiveKey="3"*/}
      {/*  items={tabItems}*/}
      {/*  indicator={{ size: (origin) => origin - 20 }}*/}
      {/*/>*/}
    </Space>
  );
}
