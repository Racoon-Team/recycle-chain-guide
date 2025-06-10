import HeroAreaHomeTwo from './HeroAreaHomeTwo';
import BrandAreaHomeTwo from './BrandAreaHomeTwo';
import BannerAreaHomeTwo from './BannerAreaHomeTwo';
import FinancialDecisionsHomeTwo from './FinancialDecisionsHomeTwo';
import FeaturesAreaHomeTwo from './FeaturesAreaHomeTwo';
import FinancialUpdatesHomeTwo from './FinancialUpdatesHomeTwo';
import TabAreaHomeTwo from './TabAreaHomeTwo';
import TestimonialAreaHomeTwo from './TestimonialAreaHomeTwo';
import PriceingAreaHomeTwo from './PriceingAreaHomeTwo';
import CtaAreaHomeTwo from './CtaAreaHomeTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';
import BackToTop from '../../../common/BackToTop';

const HomeTwo = () => {
  return (
    <>
      <HeaderOne style_2={true} toggle_color={true} />
      <HeroAreaHomeTwo />
      <BannerAreaHomeTwo />
      <BrandAreaHomeTwo />
      <FinancialDecisionsHomeTwo />
      <FeaturesAreaHomeTwo />
      <FinancialUpdatesHomeTwo />
      <TabAreaHomeTwo />
      <TestimonialAreaHomeTwo />
      <PriceingAreaHomeTwo />
      <CtaAreaHomeTwo />
      <FooterOne style_2={true} />
      <BackToTop />
    </>
  );
};

export default HomeTwo;
