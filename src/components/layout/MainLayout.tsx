import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../NavBar';

export function MainLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
