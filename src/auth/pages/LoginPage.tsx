import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useState } from "react";

export const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ correo: "", password: "" });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError({
      correo: !correo.match(/^\S+@\S+\.\S+$/) ? "Correo inválido" : "",
      password:
        password.length <= 6 ? "tiene que tener minimo 6 caracterres" : "",
    });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              value={correo}
              onChange={(event)=> setCorreo(event.target.value)}
              error={!!error.correo}
              helperText={ error.correo}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
              error= {!!error.password}
              helperText={error.password}
            />
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button variant="contained" fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" size={12}>
            <Link>Crear una cuenta</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};