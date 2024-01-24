import React, { FC, useEffect } from 'react';
import Layout from '@/pages/Layout';
import { useAppDispatch } from '@/stores/hooks';
import { setIsMobile } from '@/stores/deviceAdjustSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
