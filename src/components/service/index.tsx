import BackToTop from '../../common/BackToTop';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import FaqAreaHomeOne from '../homes/home-1/FaqAreaHomeOne';
import FeaturesAreaHomeOne from '../homes/home-1/FeaturesAreaHomeOne';
import FinancialUpdateHomeOne from '../homes/home-1/FinancialUpdateHomeOne';
import FinancialDecisionsHomeTwo from '../homes/home-2/FinancialDecisionsHomeTwo';

const Service = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Service" subtitle="Service" />
      <FinancialDecisionsHomeTwo style_3={true} />
      <FeaturesAreaHomeOne style_2={true} />
      <FinancialUpdateHomeOne style_3={true} />
      <FaqAreaHomeOne style_3={true} />
      <CtaAreaHomeOne />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Service;
