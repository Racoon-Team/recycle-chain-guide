import PortfolioDetailsArea from './PortfolioDetailsArea';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';

const SinglePortfolio = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Portfolio Details" subtitle="Portfolio Details" />
      <PortfolioDetailsArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default SinglePortfolio;
