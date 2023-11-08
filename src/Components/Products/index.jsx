// Products.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { addToCartAndUpdateInventory } from '../../Store/cart';
import './Products.scss'; // Assuming the products.scss is in the same directory

const Products = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if (product.inventoryCount > 0) {
      dispatch(addToCartAndUpdateInventory(product));
    }
  };

  const products = useSelector((state) => state.products.list);
  const activeCategory = useSelector((state) => state.categories.activeCategory);

  const filteredProducts = products.filter((product) => product.category === activeCategory);

  return (
    <Grid container spacing={2} justifyContent="center" className="product-grid">
      {filteredProducts.length ? filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.name} className="product-card">
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="h2" className="product-name">
                {product.name}
              </Typography>
              <Typography className="product-description">
                {product.description}
              </Typography>
              <Typography className="product-price">
                Price: ${product.price}
              </Typography>
              <Typography className="product-inventory">
                Inventory: ({product.inventoryCount})
              </Typography>
            </CardContent>
            <CardActions className="card-actions">
              <Button size="small" className="view-details-button">View Details</Button>
              <Button size="small" onClick={() => handleAddToCart(product)} className="add-to-cart-button">Add to Cart</Button>
            </CardActions>
          </Card>
        </Grid>
      )) : (
        <Typography variant="h5" className="no-products-message">Please select a category</Typography>
      )}
    </Grid>
  );
};

export default Products;
