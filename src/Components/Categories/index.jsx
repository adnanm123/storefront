import React, { useEffect } from 'react'; // Import useEffect here
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, fetchCategories } from '../../Store/categories';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const loading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <ButtonGroup variant="text" aria-label="text button group">
      {categories.map((category) => (
        <Button
        key={category._id} // Use _id for the key since it's unique
        onClick={() => dispatch(selectCategory(category.name))}
      >
        {category.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Categories;