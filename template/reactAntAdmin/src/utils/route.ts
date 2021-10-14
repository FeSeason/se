import { IRouterProps } from '@/interface/Router';
import routers from '@/router/config';
import sLog from './log';

const routeTypeMaps = ['path', 'name'];

export interface IRouterMatchProps {
  type: 'path' | 'name';
  val: string,
  routes?: IRouterProps[]
}

/**
 * 路由配置项匹配
 * @param props 
 * @returns 
 */
export const routeItemMatch = (props: IRouterMatchProps): IRouterProps | undefined => {
  const { type = 'path', val, routes = routers } = props;

  let matchItem;

  if (!routeTypeMaps.includes(type)) {
    sLog.info(`路由类型 [${type}] 不在匹配范围内`);

    return;
  }

  routes.some(route => {
    if (route[type] === val) {
      matchItem = route;
      
      return true;
    }

    if (route.routes) {
      const res = routeItemMatch({ type, val, routes: route.routes });

      if (res) {
        matchItem = res;
      }

      return !!res;

    }
  });

  return matchItem;
};

/**
 * 路由名称检测
 */
export const routeNameRepeatCheck = (): void => {
  const map = {};
  const checkFn = (routes = routers) => {
    routes.some(r => {
      if (!r.name || map[r.name]) {
        sLog.error(`请配置每一项路由的 [name] 属性，并确保唯一性, [error in path ${r.path}]`);

        return true;
      }
      map[r.name] = true;
      if (r.routes) {
        checkFn(r.routes);
      }
    });
  };
  checkFn();
};