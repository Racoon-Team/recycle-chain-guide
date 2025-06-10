import BackToTop from '../../common/BackToTop';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import SigninArea from './SigninArea';

const Signin = () => {
  return (
    <>
      <HeaderOne />
      <SigninArea />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Signin;
