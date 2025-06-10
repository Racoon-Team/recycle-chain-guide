import SingleServiceArea from './SingleServiceArea';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';

const SingleService = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Service Details" subtitle="Service Details" />
      <SingleServiceArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default SingleService;
