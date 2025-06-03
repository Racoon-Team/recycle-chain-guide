import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

export const PrivateRoute = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
