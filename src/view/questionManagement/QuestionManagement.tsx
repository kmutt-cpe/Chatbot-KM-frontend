import React from 'react';
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core';
import { StaffNavbar, BasicLayout } from '../../component';
import CategoryCard from './CategoryCard';
import { categories } from './category';
const questionManagement: React.FC = () => {
  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ height: '70px' }}>
          <Typography variant="h1" color="primary">
            Questions Management
          </Typography>
        </Grid>
        <GridList cellHeight={200} cols={4}>
          {categories.map((category) => (
            // eslint-disable-next-line react/jsx-key
            <GridListTile>
              <CategoryCard {...category} />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </BasicLayout>
  );
};

export default questionManagement;
