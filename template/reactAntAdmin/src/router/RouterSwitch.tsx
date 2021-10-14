import React, { FC, useMemo } from 'react';
import { Switch } from 'react-router';
import { IRouterProps } from '@/interface/Router';
import RouterWrap from './RouterWrap';

interface Props {
  routes: IRouterProps[];
}

const RouterSwitch: FC<Props> = ({ routes }) => {
  return useMemo(() => {
    return (
      <Switch>
        {Array.isArray(routes) &&
          routes.map(route => <RouterWrap key={route.name} {...route} />)}
      </Switch>
    );
  }, [routes]);
};

export default RouterSwitch;