import BackToTop from '../../common/BackToTop';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import PortfolioArea from './PortfolioArea';

const Portfolio = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Portfolio" subtitle="Portfolio" />
      <PortfolioArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Portfolio;
