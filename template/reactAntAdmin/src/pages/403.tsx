import { Button, Result } from 'antd';
import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const NotFound: FC = () => {
  const history = useHistory();

  return useMemo(() => {
    return (
      <Result
        status="403"
        style={{
          height: '100%',
          background: '#fff',
        }}
        title="当前无权限访问"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button onClick={() => history.replace('/')} type="primary">返回首页</Button>}
      />
    );
  }, []);
};

export default NotFound;
