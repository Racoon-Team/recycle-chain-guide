import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '../store/store';

export const PrivateRoute = () => {
  const { status } = useSelector((state: RootState) => state.auth);

  if (status === 'checking') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return status === 'authenticated' ? <Outlet /> : <Navigate to="/login" />;
};
