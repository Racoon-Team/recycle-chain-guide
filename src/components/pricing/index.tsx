import PricingOne from './PricingOne';
import PricngTwo from './PricngTwo';
import FaqAreaHomeOne from '../homes/home-1/FaqAreaHomeOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';
const Pricing = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Pricing" subtitle="Pricing" />
      <PricingOne />
      <PricngTwo />
      <FaqAreaHomeOne style_2={true} />
      <CtaAreaHomeOne />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Pricing;
