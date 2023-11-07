import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => (
  <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
    <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
      © 2023 Virtual Store
    </Typography>
  </Box>
);

export default Footer;
