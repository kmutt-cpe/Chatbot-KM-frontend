import React from 'react';
import { CustomCard } from '../../../component';

interface CategoryCardInterface {
  id: string;
  category?: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardInterface> = (props: CategoryCardInterface) => {
  return <CustomCard onClick={props.onClick} text={props.category} />;
};

export default CategoryCard;
