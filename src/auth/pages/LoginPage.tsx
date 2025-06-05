import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = !email.match(/^\S+@\S+\.\S+$/) ? t('errors.invalidEmail') : '';
    const passwordError = password.length <= 6 ? t('errors.shortPassword') : '';

    setError({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  return (
    <AuthLayout title={t('login.title')}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label={t('login.email')}
              type="email"
              name="email"
              placeholder="email@google.com"
              fullWidth
              value={email}
              onChange={onInputChange}
              error={!!error.email}
              helperText={error.email}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label={t('login.password')}
              type="password"
              name="password"
              placeholder="password"
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
            <Link component={RouterLink} to="/register">
              {t('login.createAccount')}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
