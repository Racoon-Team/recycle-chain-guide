import BackToTop from '../../../common/BackToTop';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import BannerAreaHomeTwo from './BannerAreaHomeTwo';
import BrandAreaHomeTwo from './BrandAreaHomeTwo';
import CtaAreaHomeTwo from './CtaAreaHomeTwo';
import FeaturesAreaHomeTwo from './FeaturesAreaHomeTwo';
import FinancialDecisionsHomeTwo from './FinancialDecisionsHomeTwo';
import FinancialUpdatesHomeTwo from './FinancialUpdatesHomeTwo';
import HeroAreaHomeTwo from './HeroAreaHomeTwo';
import PriceingAreaHomeTwo from './PriceingAreaHomeTwo';
import TabAreaHomeTwo from './TabAreaHomeTwo';
import TestimonialAreaHomeTwo from './TestimonialAreaHomeTwo';

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
