import { useMemo, useState } from 'react';
import { Box, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../theme';
import { ThemeContext } from '../../../../libs/shared/context/themeContext';
import { AppRoutes } from "../routes";

export function App() {
  const [mode, setMode] = useState<PaletteMode>('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>box</Box>
          <AppRoutes />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
