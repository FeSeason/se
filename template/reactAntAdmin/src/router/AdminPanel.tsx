import React, { FC, useEffect } from 'react';
import BasicLayout from '../components/layout';
import RouterSwitch from './RouterSwitch';

import { IRouterComponent } from '@/interface/Router';
import { useRedux } from '@/hooks/useRedux';

const AdminPanel:FC<IRouterComponent> = (props) => {
  const { routes } = props;
  const { actions } = useRedux();

  useEffect(() => {
    // 模拟登入后用户信息获取
    setTimeout(() => {
      actions.user.setUser({ name: 'Season.Hu', role: 'admin' });
    }, 1000);
  }, []);

  return (
    <BasicLayout>
      <div>
        {routes && <RouterSwitch routes={routes} />}
      </div>
    </BasicLayout>
  );
};

export default AdminPanel;
