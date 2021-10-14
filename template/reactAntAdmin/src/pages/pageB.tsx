import { Button } from 'antd';
import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRedux } from '../hooks/useRedux';

const PageB:FC = () => {
  const history = useHistory();
  const { actions } = useRedux();

  return useMemo(() => {
    return (
      <>
        <div>Page B</div>

        <Button onClick={() => {
          actions.user.setUser({ name: 'Efric' });
        }} type="primary">Change Name</Button>

        <Button onClick={() => {
          
          history.push('/admin/pageA');
        }}>Go Page A 11</Button>

        <Button type="ghost">12</Button>
      </>
    );
  }, []);
};

export default PageB;
