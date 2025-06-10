import AboutTeam from './AboutTeam';
import AboutBanner from './AboutBanner';
import AboutMission from './AboutMission';
import AboutFeatures from './AboutFeatures';
import FaqAreaHomeOne from '../homes/home-1/FaqAreaHomeOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import TestimonialAreaHomeThree from '../homes/home-3/TestimonialAreaHomeThree';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';

const AboutUs = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="About Us" subtitle="About Us" />
      <AboutBanner />
      <TestimonialAreaHomeThree style_2={true} />
      <AboutMission />
      <AboutFeatures />
      <AboutTeam />
      <FaqAreaHomeOne style_2={true} />
      <CtaAreaHomeOne />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default AboutUs;
