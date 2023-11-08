import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../Store/cart'; 
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip'; 

const CartList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="simple-cart">
      {Object.values(cartItems).map((item) => (
        <div className="cart-item" key={item.id}>
          <span>{item.name}</span>
          <Chip label={`x${item.quantity}`} />
          <IconButton onClick={() => handleRemoveFromCart(item.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default CartList;