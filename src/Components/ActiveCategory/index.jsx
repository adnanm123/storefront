import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ActiveCategory = () => {

  const activeCategory = useSelector((state) => state.categories.activeCategory);
  const categories = useSelector((state) => state.categories.list);

  const categoryDetails = categories.find((category) => category.name === activeCategory);

  if (!categoryDetails) return null;

  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h4" component="h2">
        {categoryDetails.name}
      </Typography>
      <Typography variant="subtitle1">
        {categoryDetails.description}
      </Typography>
    </Box>
  );
};

export default ActiveCategory;