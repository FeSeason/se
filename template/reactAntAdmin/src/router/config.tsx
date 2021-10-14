
import { IRouterProps } from '@/interface/Router';
import loadable from '@loadable/component';

const PageA = loadable(() => import(/*  webpackChunkName: "pageA"  */ '@/pages/PageA'));
const PageB = loadable(() => import(/*  webpackChunkName: "pageB"  */ '@/pages/PageB'));
const Welcome = loadable(() => import(/*  webpackChunkName: "welcome" */ '@/pages/Welcome'));
const NotFound = loadable(() => import(/*  webpackChunkName: "notFound" */ '@/pages/NotFound'));
const PermissionDeny = loadable(() => import(/*  webpackChunkName: "notFound" */ '@/pages/403'));
const AdminPanel = loadable(() => import(/*  webpackChunkName: "notFound" */ './AdminPanel'));

export const adminForbidPath = '/admin/403';

const routers: IRouterProps[] = [
  {
    path: '/',
    name: 'entry-redirect',
    exact: true,
    redirect: '/admin/pageA',
  },
  {
    path: '/admin',
    name: 'amdin-redirect',
    exact: true,
    redirect: '/admin/pageA',
  },
  {
    path: '/404',
    name: '404',
    exact: true,
    component: NotFound,
  },
  {
    path: '/welcome',
    name: 'welcome',
    exact: true,
    component: Welcome,
  },
  {
    path: '/admin',
    name: 'admin',
    exact: false,
    component: AdminPanel,
    routes: [
      {
        path: adminForbidPath,
        name: '403',
        exact: true,
        hideBreadcrumb: true,
        component: PermissionDeny,
      },
      {
        path: '/admin/pageB',
        name: 'page-b',
        exact: true,
        role: 'admin1',
        component: PageB,
      },
      {
        path: '/admin/pageA',
        name: 'page-a',
        exact: true,
        component: PageA,
      },
      {
        path: '*',
        name: 'admin-404',
        redirect: '/404',
      },
    ],
  },
  {
    path: '*',
    name: '-',
    redirect: '/404',
  },
];

export default routers;