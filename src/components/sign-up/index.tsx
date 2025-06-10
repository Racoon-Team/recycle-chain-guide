import BackToTop from '../../common/BackToTop';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import SignUpArea from './SignupArea';

const Signup = () => {
  return (
    <>
      <HeaderOne />
      <SignUpArea />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Signup;
