import {
	createContext, Dispatch, SetStateAction
} from "react";
import { PaletteMode } from "@mui/material";

type ThemeContextType = {
	mode: PaletteMode | null,
	setMode: Dispatch<SetStateAction<PaletteMode>> | null
};

export const ThemeContext = createContext<ThemeContextType>({
	mode: null,
	setMode: null
});
