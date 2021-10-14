import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

export default {
  // logo: false,
  title: '任务分发',
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileOutlined />,
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownOutlined />,
        access: 'canAdmin',
        routes: [
          {
            path: '/admin/pageA',
            name: 'Page A',
            icon: <CrownOutlined />,
          },
          {
            path: '/admin/pageB',
            name: 'Page B',
            icon: <CrownOutlined />,
          },

        ],
      },
      {
        name: '列表页',
        icon: <TabletOutlined />,
        path: '/list',
        component: './ListTableList',
        routes: [
          {
            path: '/list/sub-page',
            name: '一级列表页面',
            icon: <CrownOutlined />,
            routes: [
              {
                path: 'sub-sub-page1',
                name: '一一级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
              {
                path: 'sub-sub-page2',
                name: '一二级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
              {
                path: 'sub-sub-page3',
                name: '一三级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
            ],
          },
          {
            path: '/list/sub-page2',
            name: '二级列表页面',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: '/list/sub-page3',
            name: '三级列表页面',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
        ],
      },
      {
        path: 'https://ant.design',
        name: 'Ant Design 官网外链',
        icon: <AntDesignOutlined />,
      },
    ],
  },
};