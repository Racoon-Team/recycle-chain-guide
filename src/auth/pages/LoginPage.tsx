import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'store/store';
import { useForm } from '../../hooks/useForm';
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/');
    }
  }, [status, navigate]);

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  };

  const { correo, password, onInputChange } = useForm({
    correo: 'noelia@gmail.com',
    password: '1234567',
  });

  const [error, setError] = useState({ correo: '', password: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const correoError = !correo.match(/^\S+@\S+\.\S+$/) ? t('errors.invalidEmail') : '';
    const passwordError = password.length <= 6 ? t('errors.shortPassword') : '';

    setError({ correo: correoError, password: passwordError });

    if (correoError || passwordError) return;

    dispatch(startLoginWithEmailPassword({ correo, password }));
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="correo"
              placeholder="correo@google.com"
              fullWidth
              value={correo}
              onChange={onInputChange}
              error={!!error.correo}
              helperText={error.correo}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              placeholder="contraseña"
              fullWidth
              value={password}
              onChange={onInputChange}
              error={!!error.password}
              helperText={error.password}
            />
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button type="submit" variant="contained" fullWidth>
                  {t('login.login')}
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button variant="contained" fullWidth onClick={onGoogleSignIn}>
                  <Google />
                  <Typography sx={{ ml: 1 }}>{t('login.google')}</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" size={12}>
            <Link>{t('login.createAccount')}</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
