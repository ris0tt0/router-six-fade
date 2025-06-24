import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

const MUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    palette: { mode: 'dark' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { MUIProvider };
