import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FirebaseDB } from "../firebase/config";
import { useForm } from "../hooks/useForm";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const materiales = [
  "Papel y Cartón",
  "Plástico Duro",
  "Plástico PET",
  "Tetra Pak",
  "Vidrio",
];

export default function NestedModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { nombre, url, tipo, onInputChange, resetForm } = useForm({
    nombre: "",
    url: "",
    tipo: "",
  });

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!nombre || !url || !tipo) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(FirebaseDB, "lugaresReciclaje"), {
        nombre,
        url,
        tipo,
        createdAt: new Date(),
      });

      setSuccess("Lugar guardado correctamente");
      resetForm();
      setTimeout(() => {
        setOpen(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al guardar el lugar ");
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
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="URL"
            name="url"
            value={url}
            onChange={onInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Tipo de material"
            name="tipo"
            value={tipo}
            onChange={onInputChange}
            sx={{ mb: 2 }}
          >
            {materiales.map((material) => (
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