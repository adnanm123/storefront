import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../Store/categories';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  return (
    <ButtonGroup variant="text" aria-label="text button group">
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => dispatch(selectCategory(category.name))}
        >
          {category.displayName}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Categories;
