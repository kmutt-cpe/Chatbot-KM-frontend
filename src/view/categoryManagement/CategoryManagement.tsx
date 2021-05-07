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
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteCategoryModal from './assets/DeleteCategoryModal';
import CreateCategoryModal from './assets/CreateCategoryModal';
import EditCategoryModal from './assets/EditCategoryModal';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { useHistory } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';
import { QueryAllCategory } from '../../domain/query/category.query';

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
  const [searchText, setSearchText] = React.useState('');

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

  const { loading, error, data } = QueryAllCategory();
  if (loading) return <CircularProgress />;
  if (error) return null;

  const categories = data ? data.getAllCategory : [];

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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(event.target.value)
              }
            />
          </Grid>
          <Grid xs={2} item>
            <CreateCategoryModal />
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
              {categories &&
                categories
                  .filter((category) => {
                    const categoryStr = category.category.toLowerCase();
                    return categoryStr.includes(searchText.toLowerCase());
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => {
                    return (
                      <React.Fragment key={category.id}>
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
                                <EditCategoryModal {...category} />
                              </Box>
                              <Box mr={1}>
                                <DeleteCategoryModal {...category} />
                              </Box>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      </React.Fragment>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" alignItems="center" justifyContent="center">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={categories ? categories.length : 0}
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
