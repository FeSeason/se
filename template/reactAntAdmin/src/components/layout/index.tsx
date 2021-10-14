import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {  Avatar, Modal } from 'antd';
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer, MenuDataItem } from '@ant-design/pro-layout';
import defaultProps from './MenuConfig';
import { useHistory, useLocation } from 'react-router-dom';
import { isLink } from '@/utils/url';
import { useRedux } from '@/hooks/useRedux';
import DropMenus from './DropMenus';

import { HeaderItem, RightBody, UserInfo } from './style';
import { EnumDropMenuClickType } from '../../interface/Layout';
import sLog from '@/utils/log';
import { useRouterMatch } from '@/hooks/useRouterMatch';

const LayoutPro: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { hideBreadcrumb } = useRouterMatch();
  const { state } = useRedux();
  const [ pathname, setPathname ] = useState(location.pathname || '/');

  useEffect(() => {
    const hsListen = history.listen(loc => {
      sLog.great('Layout: History Listen =>>>', loc);
    });

    return hsListen;
  }, []);

  const menuClick = useCallback((item: MenuDataItem) => {
    if (!item.path) return;
    
    if (isLink(item.path)) {
      window.location.href = item.path;
    } else {
      setPathname(item.path);
      history.push(item.path);
    }
  }, []);

  const handleMenuEvent = useCallback((type) => {
    switch (type) {
    case EnumDropMenuClickType.logout:
      logoutFn();
      break;
    case EnumDropMenuClickType.guide:
      window.location.href = 'http://www.baidu.com';
      break;
    
    default:
      break;
    }
  },[]);

  /** 退出登入 */
  const logoutFn = useCallback(() => {
    Modal.confirm({
      title: '确定退出登入吗？',
      icon: <ExclamationCircleOutlined />,
      onOk () {
        console.log('on ok!');
      },
      onCancel () {
        console.log('cancel');
      }
    });
  }, []);

  /** 顶部用户信息模块 */
  const RightContent = useMemo(() => {
    return (
      <RightBody>
        <HeaderItem>
          <DropMenus handleFn={handleMenuEvent}>
            <UserInfo>
              <Avatar size="small" icon={<UserOutlined />} />
              <span>{state.userInfo.name}</span>
            </UserInfo>
          </DropMenus>
        </HeaderItem>
      </RightBody>
    );
  }, [state.userInfo]);

  /** 根据参数渲染 PageContainer 内容 */
  const ContainerPage = useMemo(() => {
    return (
      hideBreadcrumb 
        ? (
          <div>{children}</div>
        ) : (
          <PageContainer header={{ title: '' }}>
            <div>{children}</div>
          </PageContainer>
        )
    );
  }, [hideBreadcrumb]);

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        onMenuHeaderClick={e => console.log(e)}
        menuItemRender={(item, dom) => (
          <a onClick={() => menuClick(item)}>{dom}</a>
        )}
        rightContentRender={() => <div>{RightContent}</div>}
      >
        {ContainerPage}
      </ProLayout>
    </div>
  );
};

export default LayoutPro;