import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import ContactusArea from './ContactusArea';
import FaqAreaHomeOne from '../homes/home-1/FaqAreaHomeOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';

const Contactus = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Contact Us" subtitle="Contact Us" />
      <ContactusArea />
      <FaqAreaHomeOne style_4={true} />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Contactus;
