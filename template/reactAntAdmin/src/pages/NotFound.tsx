import { Button, Result } from 'antd';
import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const NotFound: FC = () => {
  const history = useHistory();

  return useMemo(() => {
    return (
      <Result
        status="404"
        style={{
          height: '100%',
          background: '#fff',
        }}
        title="访问的页面不存在"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button onClick={() => history.replace('/')} type="primary">Back Home</Button>}
      />
    );
  }, []);
};

export default NotFound;
