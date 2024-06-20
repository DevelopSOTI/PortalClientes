import React, { useState, useContext } from 'react';
import { Container, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../context/AuthContext';

const formatCurrency = (amount, currency = 'MXN') => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(amount);
};

const MisComplementos = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [complementos, setComplementos] = useState([]);

  const handleSearch = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.get(`${config.apiUrl}/complemento/get_complementos`, {
        params: {
          user_id: user.id,
          start_date: startDate,
          end_date: endDate,
        }
      });
      if (response.data.status === 'success') {
        setComplementos(response.data.complementos);
      }
    } catch (error) {
      console.error('Error fetching complementos:', error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Periodo</h1>
      <Container>
        <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-evenly' }}>
          <TextField
            id="startDate"
            label="Fecha Inicio"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            id="endDate"
            label="Fecha Fin"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
        {complementos.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Folio</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Importe</TableCell>
                  <TableCell>Moneda</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complementos.map((complemento) => (
                  <TableRow key={complemento.COMPLEMENTO_ID}>
                    <TableCell>
                      <Link
                        href={`${process.env.PUBLIC_URL}/${complemento.PATH_PDF}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {complemento.FOLIO}
                      </Link>
                    </TableCell>
                    <TableCell>{complemento.FECHA}</TableCell>
                    <TableCell>{formatCurrency(complemento.MONTO)}</TableCell>
                    <TableCell>{complemento.MONEDA}</TableCell>
                    <TableCell>
                    <Link
                        href={`${process.env.PUBLIC_URL}/${complemento.PATH_PDF}`}
                        download={complemento.FOLIO}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="contained" color="secondary">
                          Descargar
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default MisComplementos;
