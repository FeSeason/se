import { Redirect, Route } from 'react-router';
import { IRouterProps } from '@/interface/Router';
import React, { FC, useMemo } from 'react';
import { useRedux } from '@/hooks/useRedux';
import { adminForbidPath } from './config';


const RouterWrap: FC<IRouterProps> = props => {
  const route = props;
  const { state } = useRedux();

  return useMemo(() => {
    const routeRole = state?.userInfo?.role;

    if (route.role && route.role !== routeRole) {
      return <Redirect to={adminForbidPath} />;
    }

    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => {
          if (route.redirect) {
            return <Redirect to={route.redirect} />;
          }
          return (
            <route.component {...props} routes={route.routes}></route.component>
          );
        }}
      />
    );
  }, [state.userInfo]);
};

export default RouterWrap;
