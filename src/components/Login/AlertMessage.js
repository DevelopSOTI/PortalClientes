import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const AlertMessage = ({ message, success }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Alert severity={success ? 'success' : 'error'}>
                {message}
            </Alert>
        </Box>
    );
};

export default AlertMessage;
