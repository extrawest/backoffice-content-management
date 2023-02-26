import { useMemo, useState } from "react";
import {
	createTheme, PaletteMode, ThemeProvider
} from "@mui/material";
import { getDesignTokens } from "@lib/mui";
import { AppRoutes } from "../routes";
import { AuthProvider, ThemeContext } from "@lib/shared";

export function App() {
	const [mode, setMode] = useState<PaletteMode>("light");

	const theme = useMemo(
		() => createTheme(getDesignTokens(mode)),
		[mode]
	);

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
