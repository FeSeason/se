import { useRouterProps } from '@/hooks/useRouterMatch';
import { Button } from 'antd';
import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const PageA: FC = () => {
  const history = useHistory();
  const router = useRouterProps();

  return useMemo(() => {
    const a = {
      name: 'season',
      sex: 'male'
    };

    console.log(a?.name);

    return (
      <>
        <div>Page A</div>
        <Button
          onClick={() => {
            history.push('/admin/pageB');
          }}
        >
          Go Page B
        </Button>

        <Button
          onClick={() => {
            router.push({ name: '403' });
          }}
        >
          403
        </Button>

        <Button type="primary">Primary</Button>
        <Button type="primary">Primary B</Button>
      </>
    );
  }, []);
};

export default PageA;
