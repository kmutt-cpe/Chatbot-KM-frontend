import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TableCell,
  Paper,
  Box,
} from '@material-ui/core';
import { StaffNavbar, BasicLayout } from '../../component';
import { categories } from './domain/category';
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { CSSProperties } from '@material-ui/styles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import DeleteCategory from './assets/DeleteCategory';

const CategoryManagement: React.FC = () => {
  const tableHeadStyle: CSSProperties = { color: Color.white, fontWeight: 'bold' };
  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ height: '70px' }}>
          <Typography variant="h1" color="primary">
            Category Management
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
              CREATE CATEGORY
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table aria-label="customized table">
            <colgroup>
              <col style={{ width: '80%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <TableHead>
              <TableRow style={{ backgroundColor: Color.blue }}>
                <TableCell style={tableHeadStyle} align="center">
                  Category
                </TableCell>
                <TableCell style={tableHeadStyle} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, i) => {
                return (
                  <TableRow
                    key={category.id}
                    style={
                      i % 2 === 0
                        ? { backgroundColor: Color.white }
                        : { backgroundColor: Color.lightBlue }
                    }
                  >
                    <TableCell component="th" scope="row" align="center">
                      {category.category}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Box display="flex" flexDirection="row" justifyContent="center">
                        <Box mr={1}>
                          <EditRoundedIcon style={{ color: Color.secondary, height: '18px' }} />
                        </Box>
                        <Box mr={1}>
                          <DeleteCategory {...category} />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </BasicLayout>
  );
};

export default CategoryManagement;
