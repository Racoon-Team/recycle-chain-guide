import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store/store';
import Swal from 'sweetalert2';
import { FirebaseDB } from '../firebase/config';
import { useForm } from '../hooks/useForm';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const material = ['Papel y Cartón', 'Plástico Duro', 'Plástico PET', 'Tetra Pak', 'Vidrio'];

export default function NestedModal() {
  const { uid, displayName } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ name: string; url: string; tipo: string }>({
    name: '',
    url: '',
    tipo: '',
  });

  const { name, url, tipo, onInputChange, resetForm } = useForm({
    name: '',
    url: '',
    tipo: '',
  });

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '' ? 'El nombre es obligatorio.' : '',
      url: url.trim() === '' ? 'La URL es obligatoria.' : '',
      tipo: tipo.trim() === '' ? 'Selecciona un tipo de material.' : '',
    };
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      await addDoc(collection(FirebaseDB, `lugaresReciclaje`), {
        name,
        url,
        tipo,
        createdAt: new Date(),
        uid: uid,
        registerBy: displayName || 'Anónimo',
      });

      resetForm();
      setOpen(false);

      Swal.fire({
        title: '¡Guardado!',
        text: 'El lugar fue registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al guardar el lugar.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Registrar Lugar
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Registrar Lugar de Reciclaje
          </Typography>

          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={name}
            onChange={onInputChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="URL"
            name="url"
            value={url}
            onChange={onInputChange}
            error={!!errors.url}
            helperText={errors.url}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Tipo de material"
            name="tipo"
            value={tipo}
            onChange={onInputChange}
            error={!!errors.tipo}
            helperText={errors.tipo}
            sx={{ mb: 2 }}>
            {material.map((material) => (
              <MenuItem key={material} value={material}>
                {material}
              </MenuItem>
            ))}
          </TextField>

          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
