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

    const nombreError = nombre.trim() === '' ? 'Nombre requerido' : '';
    const correoError = !correo.match(/^\S+@\S+\.\S+$/) ? t('errors.invalidEmail') : '';
    const passwordError = password.length <= 6 ? t('errors.shortPassword') : '';

    setError({ nombre: nombreError, correo: correoError, password: passwordError });

    if (nombreError || correoError || passwordError) return;

    dispatch(startCreatingUserWithEmailPassword({ nombre, correo, password }));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              name="nombre"
              placeholder="Nombre completo "
              fullWidth
              value={nombre}
              onChange={onInputChange}
              error={!!error.nombre}
              helperText={error.nombre}
            />
          </Grid>

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
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end" size={12}>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} to="/login">
                ingresar
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
