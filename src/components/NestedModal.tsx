import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

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


export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const [nombre, setNombre] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [tipo, setTipo] = React.useState("");

  
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Tipo de material"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            sx={{ mb: 2 }}
          >
          </TextField>

          <Button fullWidth variant="contained">
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}