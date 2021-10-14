import styled from 'styled-components';

export const RightBody = styled.div `
  display: flex;
`;

export const HeaderItem = styled.div`
  display: flex;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #f3f3f3;
  }
`;

export const UserInfo = styled.div`
  font-weight: 200;
  font-size: 14px;
  padding: 0 10px;
  .ant-avatar {
    margin-right: 8px;
  }
`;