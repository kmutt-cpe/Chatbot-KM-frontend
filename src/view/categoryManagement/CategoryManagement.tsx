import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TableCell,
  TablePagination,
  Box,
} from '@material-ui/core';
import { StaffNavbar, BasicLayout } from '../../component';
import { categories } from './domain/category.mock';
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteCategory from './assets/DeleteCategory';
import CreateCategory from './assets/CreateCategory';
import EditCategory from './assets/EditCategory';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { useHistory } from 'react-router-dom';

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: Color.lightBlue,
      },
      '&:hover': {
        backgroundColor: '#b2c9f0 !important',
      },
    },
  })
)(TableRow);

const CategoryManagement: React.FC = () => {
  const tableHeadStyle: CSSProperties = { color: Color.white, fontWeight: 'bold' };
  const borderColumn: CSSProperties = { borderRight: '3px solid #ffffff' };
  const history = useHistory();

  const onClickCategory = (categoryId: string) => {
    history.push(`/subcategory-management/${categoryId}`);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            <CreateCategory />
          </Grid>
        </Grid>

        <TableContainer style={{ marginTop: '20px' }}>
          <Table aria-label="customized table">
            <colgroup>
              <col style={{ width: '80%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <TableHead>
              <TableRow style={{ backgroundColor: Color.blue }}>
                <TableCell style={{ ...tableHeadStyle, ...borderColumn }} align="center">
                  Category
                </TableCell>
                <TableCell style={tableHeadStyle} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => {
                  return (
                    <>
                      <StyledTableRow hover key={category.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={() => onClickCategory(category.id)}
                          style={{ ...borderColumn, cursor: 'pointer' }}
                        >
                          {category?.category}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <Box display="flex" flexDirection="row" justifyContent="center">
                            <Box mr={1}>
                              <EditCategory {...category} />
                            </Box>
                            <Box mr={1}>
                              <DeleteCategory {...category} />
                            </Box>
                          </Box>
                        </TableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" alignItems="center" justifyContent="center">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
    </BasicLayout>
  );
};

export default CategoryManagement;
