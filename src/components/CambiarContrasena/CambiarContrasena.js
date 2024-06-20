import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import config from '../../config';

const CambiarContrasena = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/user/change_password`, {
        username: user.username,
        currentPassword,
        newPassword
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al cambiar la contraseña');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Cambiar Contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Contraseña Actual"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="Nueva Contraseña"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirmar Nueva Contraseña"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {message && (
            <Typography variant="body2" color="error">
              {message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cambiar Contraseña
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CambiarContrasena;
