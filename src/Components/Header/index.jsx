import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SimpleCart from '../SimpleCart';
import './Header.scss'; // Import your SCSS file here

const Header = () => (
  <AppBar position="static" className="app-bar">
    <Toolbar className="toolbar">
      <Typography variant="h6" component="div" className="title">
        OUR STORE
      </Typography>
      <SimpleCart className="simple-cart" />
    </Toolbar>
  </AppBar>
);

export default Header;
