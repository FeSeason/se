import React from 'react';

export interface IDropMenus extends IMapKey {
  /** 显示内容 */
  label: string;

  /** 是否链接跳转 */
  link?: string;

  /** 是否禁用 */
  disable?: boolean;

  /** 是否需要上分割 */
  needDivider?: boolean;

  /** icon */
  icon: React.ReactNode
}


export enum EnumDropMenuClickType {
  /** 退出登入 */
  logout,

  /** 指南 */
  guide,
}