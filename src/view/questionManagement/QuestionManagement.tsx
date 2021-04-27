import React from 'react';
import {
  Typography,
  Grid,
  GridList,
  GridListTile,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { StaffNavbar, BasicLayout } from '../../component';
import CategoryCard from './assets/CategoryCard';
import { categories } from './domain/category';
import SearchIcon from '@material-ui/icons/Search';

const questionManagement: React.FC = () => {
  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ height: '70px' }}>
          <Typography variant="h1" color="primary">
            Questions Management
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid xs={10} item>
            <TextField
              style={{ width: '100%' }}
              placeholder="Search…"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs={2} item>
            <Button color="primary" variant="contained" style={{ fontSize: '12px' }}>
              CREATE QUESTION
            </Button>
          </Grid>
        </Grid>
        <GridList cellHeight={200} cols={4}>
          {categories.map((category) => (
            <GridListTile key={category.id}>
              <CategoryCard {...category} key={category.id} />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </BasicLayout>
  );
};

export default questionManagement;
