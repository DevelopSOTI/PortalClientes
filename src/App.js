import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import MisPedidos from './components/MisPedidos/MisPedidos';
import MisFacturas from './components/MisFacturas/MisFacturas';
import ComplementosPago from './components/ComplementosPago/ComplementosPago';
import EstadoCuenta from './components/EstadoCuenta/EstadoCuenta';
import CambiarContrasena from './components/CambiarContrasena/CambiarContrasena';
import PoliticasDevoluciones from './components/PoliticasDevoluciones/PoliticasDevoluciones';
import PoliticasVentas from './components/PoliticasVentas/PoliticasVentas';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthenticated && <Header />}
      <header className="App-header">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/cambiar-contrasena"
            element={
              <ProtectedRoute>
                <CambiarContrasena />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-pedidos"
            element={
              <ProtectedRoute>
                <MisPedidos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-facturas"
            element={
              <ProtectedRoute>
                <MisFacturas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complementos-pago"
            element={
              <ProtectedRoute>
                <ComplementosPago />
              </ProtectedRoute>
            }
          />
          <Route
            path="/estado-cuenta"
            element={
              <ProtectedRoute>
                <EstadoCuenta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cambiar-contrasena"
            element={
              <ProtectedRoute>
                <CambiarContrasena />
              </ProtectedRoute>
            }
          />
          <Route
            path="/politicas-devoluciones"
            element={
              <ProtectedRoute>
                <PoliticasDevoluciones />
              </ProtectedRoute>
            }
          />
          <Route
            path="/politicas-ventas"
            element={
              <ProtectedRoute>
                <PoliticasVentas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
