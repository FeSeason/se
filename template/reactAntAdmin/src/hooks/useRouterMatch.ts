import { IRouterProps } from '@/interface/Router';
import { routeItemMatch } from '@/utils/route';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * 匹配当前路由配置项
 * @returns 
 */
export const useRouterMatch = (): Partial<IRouterProps> => {
  const history = useHistory();
  const { pathname } = history?.location || {};
  const routeItem = routeItemMatch({ type: 'path', val: pathname }) || {};

  return routeItem;
};

export interface IRoutePush {
  name?: string;
  path?: string;
}

export interface IUseRouterProps {
  push(param: string | IRoutePush): void;
}

// TODO: 扩展 query 等参数

/**
 * 重定义路由跳转方法, 支持 push name 操作
 * @returns 
 */
export const useRouterProps = (): IUseRouterProps => {
  const history = useHistory();

  const push = useCallback((param): void => {
    if (typeof param === 'string') {
      history.push(param);
    } else if (toString.call(param) === '[object Object]') {
      
      const { name, path } = param;
      let pathname = path;

      if (name) {
        const routeItem = routeItemMatch({ type: 'name', val: name, });

        if (routeItem?.path) {
          pathname = routeItem.path;
        }
      }

      if (pathname) {
        history.push(pathname);
      }
    }
  }, []);

  return {
    push
  };
};