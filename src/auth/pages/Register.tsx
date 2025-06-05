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

  const { nombre, correo, password, onInputChange } = useForm({
    nombre: '',
    correo: '',
    password: '',
  });

  const [error, setError] = useState({ nombre: '', correo: '', password: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nombreError = nombre.trim() === '' ? t('errors.requiredName') : '';

    const correoError = !correo.match(/^\S+@\S+\.\S+$/) ? t('errors.invalidEmail') : '';
    const passwordError = password.length <= 6 ? t('errors.shortPassword') : '';

    setError({ nombre: nombreError, correo: correoError, password: passwordError });

    if (nombreError || correoError || passwordError) return;

    dispatch(startCreatingUserWithEmailPassword({ nombre, correo, password }));
  };

  return (
    <AuthLayout title="Create account">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              name="nombre"
              placeholder="Full name "
              fullWidth
              value={nombre}
              onChange={onInputChange}
              error={!!error.nombre}
              helperText={error.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="correo"
              placeholder="email@google.com"
              fullWidth
              value={correo}
              onChange={onInputChange}
              error={!!error.correo}
              helperText={error.correo}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Password"
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
                  Create account
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end" size={12}>
              <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
              <Link component={RouterLink} to="/login">
                get into
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
