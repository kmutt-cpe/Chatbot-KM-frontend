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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Color } from '../../assets/css';

interface CategoryCardInterface {
  id: string;
  category: string;
}
const CategoryCard: React.FC<CategoryCardInterface> = (props: CategoryCardInterface) => (
  <Card style={{ margin: '10px' }} {...props}>
    <CardActionArea>
      <CardMedia
        style={{
          background: 'linear-gradient(90deg, rgba(125,33,232,1) 0%, rgba(38,224,250,1) 100%)',
          height: '130px',
        }}
      >
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Box mr={1} mt={1}>
            <Fab color="primary" aria-label="edit" size="small">
              <EditRoundedIcon />
            </Fab>
          </Box>
          <Box mr={1} mt={1}>
            <Fab style={{ backgroundColor: Color.red }} aria-label="remove" size="small">
              <CloseRoundedIcon style={{ color: 'white' }} />
            </Fab>
          </Box>
        </Box>
      </CardMedia>
      <CardContent>
        <Typography align="center" color="secondary">
          {props.category}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default CategoryCard;
