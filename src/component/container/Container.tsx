/* eslint-disable react/prop-types */
import { Box } from '@material-ui/core';
import React from 'react';

interface ContainerProps {
  width?: string;
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <Box display="flex" flexDirection="row" width={props.width || '100vw'}>
      <Box width="15%"></Box>
      <Box width="70%">{props.children}</Box>
      <Box width="15%"></Box>
    </Box>
  );
};

export default Container;
