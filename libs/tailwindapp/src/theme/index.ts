import { PaletteMode } from "@mui/material";

interface ColorsList {
	50?: string;
	100?: string;
	200?: string;
	300?: string;
	400?: string;
	500?: string;
	600?: string;
	700?: string;
	800?: string;
	900?: string;
}

declare module "@mui/material" {
	interface Palette {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		primaryVariant: Palette["primary"];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		secondaryVariant: Palette["primary"];
		primaryColors: ColorsList;
		greyScale: ColorsList;
		green: ColorsList;
		blue: ColorsList;
		purple: ColorsList;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		backgroundColor: Palette["primary"];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		surfaceColor: Palette["primary"];
	}
	interface PaletteOptions {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		primaryVariant: Partial<Palette["primary"]>;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		secondaryVariant: Partial<Palette["primary"]>;
		primaryColors: ColorsList;
		greyScale: ColorsList;
		green: ColorsList;
		blue: ColorsList;
		purple: ColorsList;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		backgroundColor: Partial<Palette["primary"]>;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		surfaceColor: Partial<Palette["primary"]>;
	}
}

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "light" ? {
			primary: {
				main: "#1D2992",
				light: "#237DBF"
			},
			primaryColors: {
				900: "#E0AB00",
				800: "#FFC300",
				700: "#FFCA1F",
				600: "#FFD13D",
				500: "#FFD85A",
				400: "#FFE07B",
				300: "#FFE89C",
				200: "#FFF0BD",
				100: "#FFF7DE",
				50: "#FFFBEE"
			},
			primaryVariant: {
				main: "#F2994A",
			},
			secondary: {
				main: "#373737",
			},
			secondaryVariant: {
				main: "#FFFFFF",
			},
			greyScale:{
				50: "#F9F8F8",
				100: "#F3F3F3",
				200: "#E6E6E6",
				300: "#D1D1D1",
				400: "#B9B9B9",
				500: "#A3A3A3",
				600: "#828282",
				700: "#4F4F4F",
				800: "#333333"
			},
			error: {
				main: "#EB5757",
			},
			backgroundColor: {
				main: "#FFFFFF",
			},
			surfaceColor: {
				main: "#FFFFFF",
			},
			green: {
				200: "#6FCF97",
				400: "#27AE60",
				600: "#219653"
			},
			blue: {
				200: "#56CCF2",
				400: "#2D9CDB",
				600: "#2F80ED"
			},
			purple: {
				200: "#CF97E4",
				400: "#BB6BD9",
				600: "#9B51E0"
			}
		} : {
			primary: {
				main: "#FFF0BD"
			},
			primaryColors: {
				900: "#E0AB00",
				800: "#FFC300",
				700: "#FFCA1F",
				600: "#FFD13D",
				500: "#FFD85A",
				400: "#FFE07B",
				300: "#FFE89C",
				200: "#FFF0BD",
				100: "#FFF7DE",
				50: "#FFFBEE"
			},
			primaryVariant: {
				main: "#F2994A",
			},
			secondary: {
				main: "#373737",
			},
			secondaryVariant: {
				main: "#FFFFFF",
			},
			greyScale:{
				50: "#F9F8F8",
				100: "#F3F3F3",
				200: "#E6E6E6",
				300: "#D1D1D1",
				400: "#B9B9B9",
				500: "#A3A3A3",
				600: "#828282",
				700: "#4F4F4F",
				800: "#333333"
			},
			error: {
				main: "#F18989",
			},
			backgroundColor: {
				main: "#121212",
			},
			surfaceColor: {
				main: "#252218",
			},
			green: {
				200: "#6FCF97",
				400: "#27AE60",
				600: "#219653"
			},
			blue: {
				200: "#56CCF2",
				400: "#2D9CDB",
				600: "#2F80ED"
			},
			purple: {
				200: "#CF97E4",
				400: "#BB6BD9",
				600: "#9B51E0"
			}
		})
	}
});
