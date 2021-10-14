import { Menu, Dropdown } from 'antd';
import React, { FC, useMemo } from 'react';
import { BookOutlined, LogoutOutlined } from '@ant-design/icons';
import { EnumDropMenuClickType } from '@/interface/Layout';

interface Props extends IFCProps {
  handleFn(type: EnumDropMenuClickType): void;
}

const DropMenus: FC<Props> = props => {
  const { children, handleFn } = props;

  const Menus = useMemo(() => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => handleFn(EnumDropMenuClickType.guide)}
          key="guide"
          icon={<BookOutlined />}
        >
          操作手册
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="logout"
          onClick={() => handleFn(EnumDropMenuClickType.logout)}
          icon={<LogoutOutlined />}
        >
          退出登入
        </Menu.Item>
      </Menu>
    );
  }, []);

  return <Dropdown overlay={Menus}>{children}</Dropdown>;
};

export default DropMenus;