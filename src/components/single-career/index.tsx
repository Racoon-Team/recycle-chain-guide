import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import SingleCareerArea from './SingleCareerArea';
import BackToTop from '../../common/BackToTop';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';

const SingleCareer = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Career Details" subtitle="Career Details" />
      <SingleCareerArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default SingleCareer;
