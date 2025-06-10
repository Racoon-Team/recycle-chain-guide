import HeroAreaHomeThree from './HeroAreaHomeThree';
import TestimonialAreaHomeThree from './TestimonialAreaHomeThree';
import FinancialDecisionsHomeTwo from '../home-2/FinancialDecisionsHomeTwo';
import SpendingSmarterAreaHomeThree from './SpendingSmarterAreaHomeThree';
import VideoAreaHomeOne from '../home-1/VideoAreaHomeOne';
import FinancialUpdateHomeOne from '../home-1/FinancialUpdateHomeOne';
import BrandAreaHomeThree from './BrandAreaHomeThree';
import BlogAreaHomeThree from './BlogAreaHomeThree';
import CtaAreaHomeThree from './CtaAreaHomeThree';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';
import BackToTop from '../../../common/BackToTop';

const HomeThree = () => {
  return (
    <>
      <HeaderOne style_3={true} />
      <HeroAreaHomeThree />
      <TestimonialAreaHomeThree />
      <FinancialDecisionsHomeTwo style_2={true} />
      <SpendingSmarterAreaHomeThree />
      <VideoAreaHomeOne style_2={true} />
      <FinancialUpdateHomeOne style_2={true} />
      <BrandAreaHomeThree />
      <BlogAreaHomeThree />
      <CtaAreaHomeThree />
      <FooterOne style_3={true} />
      <BackToTop />
    </>
  );
};

export default HomeThree;
