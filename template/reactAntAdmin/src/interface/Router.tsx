import { RouteComponentProps } from 'react-router-dom';

export interface IRouterProps {
  /** 页面路由 */
  path?: string;

  /** 路由名称 */
  name: string;

  /** 页面组件 */
  component?: any;

  /** 是否精确匹配 */
  exact?: boolean;

  /** 是否隐藏面包屑导航 */
  hideBreadcrumb?: boolean;

  /** 角色，配置后对应路由会校验权限 */
  role?: string;

  redirect?: string;

  routes?: IRouterProps[];
}

export interface IRouterComponent extends RouteComponentProps {
  routes?: IRouterProps[];
}
