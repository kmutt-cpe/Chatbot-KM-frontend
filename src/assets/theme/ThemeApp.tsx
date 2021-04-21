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
  typography: {
    // Use the system font instead of the default Roboto font.
    h1: {
      fontSize: '20',
    },
    h2: {
      fontSize: '18',
    },
    h3: {
      fontSize: '16',
    },
    h4: { fontSize: '14' },
  },
});

const ThemeApp: React.FC<ThemeProps> = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default ThemeApp;
