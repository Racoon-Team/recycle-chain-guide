import BackToTop from '../../common/BackToTop';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import SingleTeamArea from './SingleTeamArea';

const SingleTeam = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Team Details" subtitle="Team Details" />
      <SingleTeamArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default SingleTeam;
