import React from 'react';
import { CustomCard } from '../../../component';

interface CategoryCardInterface {
  id: string;
  category?: string;
}

const CategoryCard: React.FC<CategoryCardInterface> = (props: CategoryCardInterface) => {
  const onClick = () => {
    // todo: Add onClick to see in each question
  };

  return <CustomCard onClick={onClick} text={props.category} />;
};

export default CategoryCard;
