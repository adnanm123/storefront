import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './SimpleCart.scss'; // Assuming your SCSS file is in the same directory

const SimpleCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="simple-cart">
      <Badge badgeContent={itemCount} color="secondary" overlap="rectangular">
        <ShoppingCartIcon className="shopping-cart-icon" />
      </Badge>
    </div>
  );
};

export default SimpleCart;
