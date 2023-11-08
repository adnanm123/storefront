// Footer.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Footer.scss'; // Make sure the SCSS file path is correct

const Footer = () => (
  <Box className="footer-box" component="footer">
    <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
      © 2023 Virtual Store
    </Typography>
  </Box>
);

export default Footer;
