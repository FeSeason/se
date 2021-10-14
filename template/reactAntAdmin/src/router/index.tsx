import React, { FC, Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spin } from 'antd';

import RouterSwitch from './RouterSwitch';
import config from './config';
import { Provider } from '../store/store';
import { routeNameRepeatCheck } from '@/utils/route';


const App:FC = () => {

  useEffect(() => {
    // 路由 name 配置检测
    routeNameRepeatCheck();
    return routeNameRepeatCheck;
  },[]);

  return (
    <Provider>
      <Router>
        <Suspense fallback={<Spin/>}>
          <RouterSwitch routes={config} />
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
