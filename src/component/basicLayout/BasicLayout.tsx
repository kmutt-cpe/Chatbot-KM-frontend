/* eslint-disable react/prop-types */
import { Box, Container } from '@material-ui/core';
import CSS from 'csstype';
import React from 'react';

interface BasicLayoutProps {
  navbar?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  children?: any;
  footer?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  style?: CSS.Properties;
}
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { navbar, children, footer, style, ...rest } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      height="100%"
      width="100vw"
      alignItems="center"
    >
      <Box width="100%">{navbar}</Box>
      <Box flexGrow={1} style={style} {...rest}>
        <Container fixed>{children}</Container>
      </Box>
      <Box width="100%">{footer}</Box>
    </Box>
  );
};

export default BasicLayout;
