import BackToTop from '../../common/BackToTop';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import SingleIntefrationArea from './SingleIntefrationArea';

const SingleIntegration = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Integration Details" subtitle="Integration Details" />
      <SingleIntefrationArea />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default SingleIntegration;
