import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from '../common/ScrollToTop';

const Wrapper = ({ children }: any) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
};

export default Wrapper;
