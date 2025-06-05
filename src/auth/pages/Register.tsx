import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'store/store';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';

export const Register = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/');
    }
  }, [status, navigate]);

  const { name, email, password, onInputChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nameError = name.trim() === '' ? t('errors.requiredName') : '';

    const emailError = !email.match(/^\S+@\S+\.\S+$/) ? t('errors.invalidEmail') : '';
    const passwordError = password.length <= 6 ? t('errors.shortPassword') : '';

    setError({ name: nameError, email: emailError, password: passwordError });

    if (nameError || emailError || passwordError) return;

    dispatch(startCreatingUserWithEmailPassword({ name, email, password }));
  };

  return (
    <AuthLayout title={t('login.createAccount')}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label={t('login.fullname')}
              type="text"
              name="name"
              placeholder="Full name "
              fullWidth
              value={name}
              onChange={onInputChange}
              error={!!error.name}
              helperText={error.name}
            />
          </Grid>

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
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" fullWidth>
                  {t('login.createAccount')}
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end" size={12}>
              <Typography sx={{ mr: 1 }}>{t('login.titleAccount')}</Typography>
              <Link component={RouterLink} to="/login">
                {t('login.getInto')}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
