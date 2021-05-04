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
import { categories } from './domain/category.mock';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

const QuestionManagement: React.FC = () => {
  const history = useHistory();

  const [searchText, setSearchText] = React.useState('');

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
              value={searchText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(event.target.value)
              }
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
            <Button
              color="primary"
              variant="contained"
              style={{ fontSize: '12px' }}
              onClick={() => history.push('/create-question')}
            >
              CREATE QUESTION
            </Button>
          </Grid>
        </Grid>
        <GridList cellHeight={200} cols={4}>
          {categories
            .filter((category) => {
              const categoryStr = category.category.toLowerCase();
              return categoryStr.includes(searchText.toLowerCase());
            })
            .map((category) => (
              <GridListTile key={category.id}>
                <CategoryCard
                  {...category}
                  key={category.id}
                  onClick={() => history.push(`/question-list/${category.id}`)}
                />
              </GridListTile>
            ))}
        </GridList>
      </Grid>
    </BasicLayout>
  );
};

export default QuestionManagement;
