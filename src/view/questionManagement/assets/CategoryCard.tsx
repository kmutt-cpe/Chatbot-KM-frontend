import React from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Box,
  Fab,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Color } from '../../../assets/css';
import EditCategoryPopup from './EditCategoryPopup';
import { ConfirmModal } from '../../../component';

interface CategoryCardInterface {
  id: string;
  category: string;
}

const CategoryCard: React.FC<CategoryCardInterface> = (props: CategoryCardInterface) => {
  const [modal, setModal] = React.useState(false);
  const onOpenConfirm = () => {
    setModal(true);
  };

  const onCloseConfirm = () => {
    setModal(false);
  };

  return (
    <Card style={{ margin: '10px' }} {...props}>
      <CardActionArea>
        <CardMedia
          style={{
            background: 'linear-gradient(90deg, rgba(125,33,232,1) 0%, rgba(38,224,250,1) 100%)',
            height: '130px',
          }}
        />
        <CardContent>
          <Typography align="center" color="secondary">
            {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
