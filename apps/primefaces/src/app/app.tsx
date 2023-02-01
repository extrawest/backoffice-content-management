import { useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../../../../libs/muilib/src/theme';
import { ThemeContext } from '../../../../libs/shared/context/themeContext';
import { AppRoutes } from "../routes";
import { AuthProvider } from "../../../../libs/shared/context/Auth";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "./styles.scss";

export function App() {
  const [mode, setMode] = useState<PaletteMode>('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
