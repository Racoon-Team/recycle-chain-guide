import BackToTop from '../../common/BackToTop';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import SingleBlogArea from './SingleBlogArea';

const SingleBlog = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Blog Details" subtitle="Blog Details" />
      <SingleBlogArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default SingleBlog;
