const config = {
    development: {
    //  apiUrl: 'http://localhost:8080/backPortalClientes/index.php',
      apiUrl: 'https://soti.com.mx/PortalClientes/api/index.php',
    },
    production: {
      apiUrl: 'https://soti.com.mx/PortalClientes/api/index.php',
    },
  };
  
  const getConfig = () => {
    const env = process.env.NODE_ENV || 'production';
    return config[env];
  };
  
  export default getConfig();
  