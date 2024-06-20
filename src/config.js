const config = {
    development: {
      apiUrl: 'http://localhost:8080/backPortalClientes/index.php',
    },
    production: {
      apiUrl: 'https://soti.com.mx/PortalClientes/api/index.php',
    },
  };
  
  const getConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    return config[env];
  };
  
  export default getConfig();
  