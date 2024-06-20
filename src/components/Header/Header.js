import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { AuthContext } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleSubMenuClose();
  };

  const handleSubMenuOpen = (event, menu) => {
    setSubMenuAnchorEl(event.currentTarget);
    setActiveSubMenu(menu);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
    setActiveSubMenu(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </MenuButton>
          <Title variant="h6">
            Client Portal
          </Title>
          {isAuthenticated && (
            <div>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleUserMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={userAnchorEl}
                keepMounted
                open={Boolean(userAnchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem>{user ? `Hola, ${user.name}` : 'Usuario'}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              aria-haspopup="true"
              onMouseEnter={(e) => handleSubMenuOpen(e, 'pedidos')}
              onMouseLeave={handleSubMenuClose}
            >
              Pedidos
              <Popover
                anchorEl={subMenuAnchorEl}
                open={activeSubMenu === 'pedidos'}
                onClose={handleSubMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
              >
                <MenuItem onClick={() => handleNavigation('/mis-pedidos')}>Mis Pedidos</MenuItem>
              </Popover>
            </MenuItem>
            <MenuItem
              aria-haspopup="true"
              onMouseEnter={(e) => handleSubMenuOpen(e, 'facturacion')}
              onMouseLeave={handleSubMenuClose}
            >
              Facturación
              <Popover
                anchorEl={subMenuAnchorEl}
                open={activeSubMenu === 'facturacion'}
                onClose={handleSubMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
              >
                <MenuItem onClick={() => handleNavigation('/mis-facturas')}>Mis Facturas</MenuItem>
                <MenuItem onClick={() => handleNavigation('/complementos-pago')}>Complementos de Pago</MenuItem>
                <MenuItem onClick={() => handleNavigation('/estado-cuenta')}>Estado de Cuenta</MenuItem>
              </Popover>
            </MenuItem>
            <MenuItem
              aria-haspopup="true"
              onMouseEnter={(e) => handleSubMenuOpen(e, 'cuenta')}
              onMouseLeave={handleSubMenuClose}
            >
              Cuenta
              <Popover
                anchorEl={subMenuAnchorEl}
                open={activeSubMenu === 'cuenta'}
                onClose={handleSubMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
              >
                <MenuItem onClick={() => handleNavigation('/cambiar-contrasena')}>Cambiar Contraseña</MenuItem>
              </Popover>
            </MenuItem>
            <MenuItem
              aria-haspopup="true"
              onMouseEnter={(e) => handleSubMenuOpen(e, 'politicas')}
              onMouseLeave={handleSubMenuClose}
            >
              Políticas
              <Popover
                anchorEl={subMenuAnchorEl}
                open={activeSubMenu === 'politicas'}
                onClose={handleSubMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
              >
                <MenuItem onClick={() => handleNavigation('/politicas-devoluciones')}>Políticas de Devoluciones</MenuItem>
                <MenuItem onClick={() => handleNavigation('/politicas-ventas')}>Políticas de Ventas</MenuItem>
              </Popover>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Root>
  );
};

export default Header;