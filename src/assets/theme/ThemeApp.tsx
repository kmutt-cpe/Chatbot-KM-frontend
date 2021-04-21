/* eslint-disable react/prop-types */
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Color } from '../css';

interface ThemeProps {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Color.primary,
    },
    secondary: {
      main: Color.secondary,
    },
  },
});

const ThemeApp: React.FC<ThemeProps> = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default ThemeApp;
