import {
	createContext, Dispatch, SetStateAction
} from "react";
import { PaletteMode } from "@mui/material";

type ThemeContextType = {
	mode: PaletteMode | "light",
	setMode: Dispatch<SetStateAction<PaletteMode>> | null
};

export const ThemeContext = createContext<ThemeContextType>({
	mode: "light",
	setMode: null
});
