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
import { StaffNavbar, BasicLayout } from '../../component';

import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteUser from './assets/DeleteUser';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { QueryAllUser } from '../../domain/query/user.query';

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

const UserManagement: React.FC = () => {
  const tableHeadStyle: CSSProperties = { color: Color.white, fontWeight: 'bold' };
  const borderColumn: CSSProperties = { borderRight: '3px solid #ffffff' };
  const history = useHistory();
  const [searchText, setSearchText] = React.useState('');

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, loading, error } = QueryAllUser();
  if (loading) return <CircularProgress />;
  if (error) return null;

  const users = data ? data.getAllUser : [];

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ height: '70px' }}>
          <Typography variant="h1" color="primary">
            User Management
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
          <Grid item container xs={2} justify="flex-start">
            <Button
              color="primary"
              variant="contained"
              style={{ fontSize: '12px' }}
              onClick={() => history.push('/create-user')}
            >
              CREATE USER
            </Button>
          </Grid>
        </Grid>

        <TableContainer style={{ marginTop: '20px' }}>
          <Table aria-label="customized table">
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <TableHead>
              <TableRow style={{ backgroundColor: Color.blue }}>
                <TableCell style={{ ...tableHeadStyle, ...borderColumn }} align="center">
                  Role
                </TableCell>
                <TableCell style={{ ...tableHeadStyle, ...borderColumn }} align="center">
                  Username
                </TableCell>
                <TableCell style={{ ...tableHeadStyle, ...borderColumn }} align="center">
                  Name
                </TableCell>
                <TableCell style={tableHeadStyle} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => {
                  const query = searchText.toLowerCase();
                  const roleState = user.role.toLowerCase().includes(query);
                  const usernameState = user.username.toLowerCase().includes(query);
                  const nameState = user.name.toLowerCase().includes(query);
                  return roleState || usernameState || nameState;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <>
                      <StyledTableRow hover key={user.id}>
                        <TableCell
                          component="td"
                          scope="row"
                          align="center"
                          style={{ ...borderColumn, cursor: 'pointer' }}
                          onClick={() => history.push(`/user-view/${user.id}`)}
                        >
                          {user.role}
                        </TableCell>
                        <TableCell
                          component="td"
                          scope="row"
                          align="center"
                          style={{ ...borderColumn, cursor: 'pointer' }}
                          onClick={() => history.push(`/user-view/${user.id}`)}
                        >
                          {user.username}
                        </TableCell>
                        <TableCell
                          component="td"
                          scope="row"
                          align="center"
                          style={{ ...borderColumn, cursor: 'pointer' }}
                          onClick={() => history.push(`/user-view/${user.id}`)}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <Box display="flex" flexDirection="row" justifyContent="center">
                            <Box mr={1}>
                              <IconButton
                                onClick={() => history.push(`/edit-user/${user.id}`)}
                                size="small"
                              >
                                <EditRoundedIcon style={{ color: Color.secondary }} />
                              </IconButton>
                            </Box>
                            <Box mr={1}>
                              <DeleteUser id={user.id} username={user.username} name={user.name} />
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
            count={users.length}
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

export default UserManagement;
