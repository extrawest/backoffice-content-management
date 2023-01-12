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
		primaryVariant: Palette["primary"];
		secondaryVariant: Palette["primary"];
		primaryColors: ColorsList;
		greyScale: ColorsList;
		green: ColorsList;
		blue: ColorsList;
		purple: ColorsList;
		backgroundColor: Palette["primary"];
		surfaceColor: Palette["primary"];
	}
	interface PaletteOptions {
		primaryVariant: Partial<Palette["primary"]>;
		secondaryVariant: Partial<Palette["primary"]>;
		primaryColors: ColorsList;
		greyScale: ColorsList;
		green: ColorsList;
		blue: ColorsList;
		purple: ColorsList;
		backgroundColor: Partial<Palette["primary"]>;
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
	},
  typography: {
    fontFamily: ["Poppins", 'sans-serif'].join(','),
    h1: {
      fontSize: '2.625rem',
      fontWeight: 700,
      lineHeight: 2.5
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 2.5,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 2.5,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHesubtitleWrapperight: 1.375,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    subtitle1: {
      fontWeight: 700,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.2,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1,
    }
  },
});
