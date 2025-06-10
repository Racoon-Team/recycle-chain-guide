import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import CareerArea from './CareerArea';
import FeaturesAreaHomeOne from '../homes/home-1/FeaturesAreaHomeOne';
import BrandAreaHomeTwo from '../homes/home-2/BrandAreaHomeTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';

const Career = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Career" subtitle="Career" />
      <BrandAreaHomeTwo style_2={true} />
      <FeaturesAreaHomeOne style_3={true} />
      <CareerArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Career;
