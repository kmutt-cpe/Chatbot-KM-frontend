import React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core';

interface CustomCardInterface {
  id?: string;
  text?: string;
  cardMediaColor?: string;
  onClick?: (props?: any) => void;
}

const CustomCard: React.FC<CustomCardInterface> = (props: CustomCardInterface) => {
  return (
    <Card style={{ margin: '10px' }} {...props} onClick={props.onClick}>
      <CardActionArea>
        <CardMedia
          style={{
            background:
              props.cardMediaColor ||
              'linear-gradient(90deg, rgba(125,33,232,1) 0%, rgba(38,224,250,1) 100%)',
            height: '130px',
          }}
        />
        <CardContent>
          <Typography align="center" color="secondary">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomCard;
