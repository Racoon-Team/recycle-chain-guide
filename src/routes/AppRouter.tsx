
import { PagesRoutes } from '@pages/routers/PagesRoutes';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages';


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<PagesRoutes />} />
    </Routes>
  );
}
