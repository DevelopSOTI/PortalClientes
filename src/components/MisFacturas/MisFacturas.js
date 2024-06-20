import React, { useState, useContext } from 'react';
import { Container, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../context/AuthContext';

const formatCurrency = (amount, currency = 'MXN') => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(amount);
};

const MisFacturas = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [facturas, setFacturas] = useState([]);

  const handleSearch = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.get(`${config.apiUrl}/factura/get_facturas`, {
        params: {
          user_id: user.id,
          start_date: startDate,
          end_date: endDate,
        }
      });
      if (response.data.status === 'success') {
        setFacturas(response.data.facturas);
      }
    } catch (error) {
      console.error('Error fetching facturas:', error);
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
        {facturas.length > 0 && (
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
                {facturas.map((factura) => (
                  <TableRow key={factura.id}>
                    <TableCell>
                      <Link
                        href={`${process.env.PUBLIC_URL}/${factura.path_pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {factura.nombre_pdf}
                      </Link>
                    </TableCell>
                    <TableCell>{factura.fecha_pdf}</TableCell>
                    <TableCell>{formatCurrency(factura.monto)}</TableCell>
                    <TableCell>{factura.moneda}</TableCell>
                    <TableCell>
                    <Link
                        href={`${process.env.PUBLIC_URL}/${factura.path_pdf}`}
                        download={factura.nombre_pdf}
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

export default MisFacturas;
