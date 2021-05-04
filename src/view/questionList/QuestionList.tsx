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
} from '@material-ui/core';
import { StaffNavbar, BasicLayout, BackButton } from '../../component';
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteQuestion from './assets/DeleteQuestion';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { faqs as faqDB } from './domain/faq.mock';
import { categories } from './domain/category.mock';

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

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();

  // todo: Get category and faq from backend-api instead
  const category = categories.find((category) => category.id === categoryId);
  if (!category) history.push('/question-management');
  const faqs = faqDB.filter((faq) => faq.category.id === categoryId);

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
              {faqs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question) => {
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
                              onClick={() => history.push(`/edit-question/${question.id}`)}
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
    </BasicLayout>
  );
};

export default QuestionList;
