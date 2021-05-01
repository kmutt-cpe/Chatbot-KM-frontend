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
import { StaffNavbar, BasicLayout } from '../../component';
import { users } from './domain/user';
import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../../assets/css';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DeleteCategory from './assets/DeleteUser';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';

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
  const onClickCreateUser = () => {
    // todo: Implement create user
  };

  const onClickEditUser = () => {
    // todo: Implement edit user
  };

  const onClickViewUser = (user: { id: string; username: string; name: string; role: string }) => {
    // todo: Implement view user
    alert(user);
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
            />
          </Grid>
          <Grid item container xs={2} justify="flex-end">
            <Button
              color="primary"
              variant="contained"
              style={{ fontSize: '12px' }}
              onClick={onClickCreateUser}
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
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                return (
                  <>
                    <StyledTableRow hover key={user.id}>
                      <TableCell
                        component="td"
                        scope="row"
                        align="center"
                        style={{ ...borderColumn, cursor: 'pointer' }}
                        onClick={() => onClickViewUser(user)}
                      >
                        {user.role}
                      </TableCell>
                      <TableCell
                        component="td"
                        scope="row"
                        align="center"
                        style={{ ...borderColumn, cursor: 'pointer' }}
                        onClick={() => onClickViewUser(user)}
                      >
                        {user.username}
                      </TableCell>
                      <TableCell
                        component="td"
                        scope="row"
                        align="center"
                        style={{ ...borderColumn, cursor: 'pointer' }}
                        onClick={() => onClickViewUser(user)}
                      >
                        {user.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <Box display="flex" flexDirection="row" justifyContent="center">
                          <Box mr={1}>
                            <IconButton onClick={onClickEditUser} size="small">
                              <EditRoundedIcon style={{ color: Color.secondary }} />
                            </IconButton>
                          </Box>
                          <Box mr={1}>
                            <DeleteCategory
                              id={user.id}
                              username={user.username}
                              name={user.name}
                            />
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
