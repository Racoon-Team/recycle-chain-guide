import BackToTop from '../../common/BackToTop';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CtaAreaHomeOne from '../homes/home-1/CtaAreaHomeOne';
import BlogArea from './BlogArea';

const Blog = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Blog" subtitle="Blog" />
      <BlogArea />
      <CtaAreaHomeOne style_2={true} />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Blog;
