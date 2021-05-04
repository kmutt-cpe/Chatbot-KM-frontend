import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { StaffNavbar, BasicLayout } from '../../component';

const QuestionView: React.FC = () => {
  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Box display="flex" height="80vh" alignItems="center" justifyContent="center">
        <Typography align="center" variant="h1" color="primary">
          Page not found
        </Typography>
      </Box>
    </BasicLayout>
  );
};

export default QuestionView;
