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
  Button,
  CircularProgress,
} from '@material-ui/core';
import { StaffNavbar, BasicLayout, BackButton, AlertModal } from '../../component';
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteQuestion from './assets/DeleteQuestion';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { QueryFAQByCategoryId } from '../../domain/query/faq.query';
import { Redirect } from 'react-router-dom';
import { ModeratorAccess } from '../../common/role';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../lib/redux/reducers';

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

const QuestionList: React.FC = () => {
  const tableHeadStyle: CSSProperties = { color: Color.white, fontWeight: 'bold' };
  const borderColumn: CSSProperties = { borderRight: '3px solid #ffffff' };
  const [searchText, setSearchText] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const [alertModal, setAlertModal] = React.useState(false);
  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();

  const { loading, error, data } = QueryFAQByCategoryId(categoryId);
  if (loading) return <CircularProgress />;
  if (error) return <Redirect to="/page-not-found" />;
  const faqs = data ? data.getFAQByCategoryId : [];
  const category = data ? data.getCategoryById : null;

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
        <Grid item style={{ marginBottom: '20px' }}>
          <BackButton path="/question-management" />
        </Grid>
        <Grid item>
          <Typography variant="h2" color="primary" style={{ marginBottom: '5px' }}>
            Question Management
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography variant="h1" color="primary">
            {category?.category}
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
            <Button
              color="primary"
              variant="contained"
              style={{ fontSize: '12px' }}
              onClick={() => {
                for (const userRole of ModeratorAccess)
                  if (role === userRole) {
                    history.push('/create-question');
                  }
                setAlertModal(true);
              }}
            >
              CREATE QUESTION
            </Button>
          </Grid>
        </Grid>

        <TableContainer style={{ marginTop: '20px' }}>
          <Table aria-label="customized table">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <TableHead>
              <TableRow style={{ backgroundColor: Color.blue }}>
                <TableCell style={{ ...tableHeadStyle, ...borderColumn }} align="center">
                  Subcategory
                </TableCell>
                <TableCell style={{ ...tableHeadStyle, ...borderColumn }} align="center">
                  Question
                </TableCell>
                <TableCell style={tableHeadStyle} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faqs
                .filter((faq) => {
                  const query = searchText.toLowerCase();
                  const subcategory = faq.subcategory.subcategory.toLowerCase();
                  const question = faq.question.toLowerCase();
                  return subcategory.includes(query) || question.includes(query);
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question) => {
                  return (
                    <>
                      <StyledTableRow hover key={question.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ ...borderColumn, cursor: 'pointer' }}
                          onClick={() => history.push(`/question-view/${question.id}`)}
                        >
                          {question.subcategory.subcategory}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ ...borderColumn, cursor: 'pointer' }}
                          onClick={() => history.push(`/question-view/${question.id}`)}
                        >
                          {question.question}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <Box display="flex" flexDirection="row" justifyContent="center">
                            <Box mr={1}>
                              <IconButton
                                onClick={() => {
                                  for (const userRole of ModeratorAccess)
                                    if (role === userRole)
                                      return history.push(`/edit-question/${question.id}`);
                                  setAlertModal(true);
                                }}
                                size="small"
                              >
                                <EditRoundedIcon style={{ color: Color.secondary }} />
                              </IconButton>
                            </Box>
                            <Box mr={1}>
                              <DeleteQuestion id={question.id} question={question.question} />
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
            count={faqs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
      <AlertModal
        open={alertModal}
        handleClose={() => {
          setAlertModal(false);
        }}
        alertTitle="Unauthorized"
        alertMessage="You don't have access to this"
      />
    </BasicLayout>
  );
};

export default QuestionList;
