import HowToRecycle from '@components/how-to-recycle';
import RecycleMap from '@components/recycle-map';

import UserSettings from '@components/setting/UserSettings';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutUs from './components/about-us';
import Blog from './components/blog';
import Career from './components/career';
import Contactus from './components/contact-us';
import CoomingSoon from './components/cooming-soon';
import Faq from './components/faq';
import HomeTwo from './components/homes/home-2';
import HomeThree from './components/homes/home-3';
import Integration from './components/integration';
import NotFound from './components/not-found';
import Portfolio from './components/portfolio';
import Pricing from './components/pricing';
import ResetPassword from './components/reset-password';
import Service from './components/service';
import Signin from './components/sign-in';
import Signup from './components/sign-up';
import SingleBlog from './components/single-blog';
import SingleCareer from './components/single-career';
import SingleIntegration from './components/single-integration';
import SinglePortfolio from './components/single-portfolio';
import SingleService from './components/single-service';
import SingleTeam from './components/single-team';
import Team from './components/team';
import { useCheckAuth } from './hooks/useCheckAuth';
import Wrapper from './layouts/Wrapper';

const router = createBrowserRouter([
  { path: '/', element: <HomeThree /> },
  { path: '/home-2', element: <HomeTwo /> },
  { path: '/home-3', element: <HomeThree /> },
  { path: '/about-us', element: <AboutUs /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/integration', element: <Integration /> },
  { path: '/single-integration', element: <SingleIntegration /> },
  { path: '/team', element: <Team /> },
  { path: '/single-team', element: <SingleTeam /> },
  { path: '/service', element: <Service /> },
  { path: '/single-service', element: <SingleService /> },
  { path: '/career', element: <Career /> },
  { path: '/single-career', element: <SingleCareer /> },
  { path: '/faq', element: <Faq /> },
  { path: '/cooming-soon', element: <CoomingSoon /> },
  { path: '/sign-up', element: <Signup /> },
  { path: '/sign-in', element: <Signin /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/single-portfolio', element: <SinglePortfolio /> },
  { path: '/blog', element: <Blog /> },
  { path: '/single-blog', element: <SingleBlog /> },
  { path: '/contact-us', element: <Contactus /> },

  { path: '/how-to-recycle', element: <HowToRecycle /> },
  { path: '/recycle-map', element: <RecycleMap /> },
  { path: '/userSetting', element: <UserSettings /> },
  { path: '*', element: <NotFound /> },
]);

// declare var global: any;

function App() {
  useCheckAuth();

  const { status } = useSelector((state: any) => state.auth);

  if (status === 'checking') {
    return;
  }
  return (
    <>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </>
  );
}

export default App;
