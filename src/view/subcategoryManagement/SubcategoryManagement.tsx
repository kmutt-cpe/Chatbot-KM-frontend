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
  CircularProgress,
} from '@material-ui/core';
import { StaffNavbar, BasicLayout, BackButton } from '../../component';
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteSubcategory from './assets/DeleteSubcategoryModal';
import CreateSubcategoryModal from './assets/CreateSubcategoryModal';
import EditSubcategory from './assets/EditSubcategoryModal';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Redirect, useParams } from 'react-router-dom';
import { GetSubcategoryByCategoryId } from '../../domain/query/subcategory.query';

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: Color.lightBlue,
      },
      '&:hover': {
        backgroundColor: '#b2c9f0 !important',
      },
    },
  })
)(TableRow);

const SubcategoryManagement: React.FC = () => {
  const tableHeadStyle: CSSProperties = { color: Color.white, fontWeight: 'bold' };
  const borderColumn: CSSProperties = { borderRight: '3px solid #ffffff' };
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState('');

  const { categoryId } = useParams<{ categoryId: string }>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { loading, error, data } = GetSubcategoryByCategoryId(categoryId);
  if (loading) return <CircularProgress />;
  if (error) return <Redirect to="/page-not-found" />;

  const subcategories = data ? data.getSubcategoryByCategoryId : [];
  const category = data ? data.getCategoryById : null;

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <BackButton path="/category-management" />
        </Grid>
        <Grid item>
          <Typography variant="h2" color="primary" style={{ marginBottom: '5px' }}>
            Subcategory Management
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography variant="h1" color="primary">
            {category?.category}
          </Typography>
        </Grid>
        <Grid container direction="row" justify="space-between">
          <Grid xs={9} item>
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
          <Grid item container xs={3} justify="flex-end">
            <CreateSubcategoryModal category={category?.category} categoryId={category?.id} />
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
                  Subcategory
                </TableCell>
                <TableCell style={tableHeadStyle} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategories
                .filter((subcategory) => {
                  const subcategoryStr = subcategory.subcategory.toLowerCase();
                  return subcategoryStr.includes(searchText.toLowerCase());
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subcategory) => {
                  return (
                    <>
                      <StyledTableRow hover key={subcategory.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ ...borderColumn }}
                        >
                          {subcategory.subcategory}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <Box display="flex" flexDirection="row" justifyContent="center">
                            <Box mr={1}>
                              <EditSubcategory {...subcategory} />
                            </Box>
                            <Box mr={1}>
                              <DeleteSubcategory {...subcategory} />
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
            count={subcategories.length}
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

export default SubcategoryManagement;
