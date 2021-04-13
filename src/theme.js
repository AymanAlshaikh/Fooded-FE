import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#669A8B" },
    secondary: { main: "#C2D7E2" },
    other: { main: "#D7DEDF", dark: "#9eb2b7", light: "#f1f1f1" },
    // background: { default: "#D8DEDF" },

    // text: { secondary: "#eae0c8" },
  },
  typography: {
    fontFamily: ["Overlock", "cursive"].join(","),
    fontSize: 14,
    letterSpacing: 0.32,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    h5: {
      fontWeight: 700,
    },
  },
});
export default theme;

/* 
Source: https://www.houzz.com/magazine/5-fresh-kitchen-color-palettes-stsetivw-vs~130857297
______________________________________

Palette (Pretty in Pink)
______________________________________
 = = Pink = =
#D3BCBD

 = = Aloe = =
#D7DBD5
    other: { main: "#D7DBD5", dark: "#949792", light: "#f0f4ed" },

 = = White-sh = = 
#EEEDE9
    other: { main: "#EEEDE9", dark: "#bcbbb8", light: "#fbfaf6" },

______________________________________

Palette (Crisp and Airy)
______________________________________
 = = Baby blue-ish = =
#C2D7E2

 = = Mist = =
#D7DEDF
    other: { main: "#D7DEDF", dark: "#9eb2b7", light: "#f1f1f1" },

 = = Derby Green = =
#669A8B
______________________________________

Palette (Purple Reign)
______________________________________
 = = Purple = =
#9C92B7

 = = Purpled Gray = =
#ABADB5

 = = Touch of Gray = =
#D4D3D8
    other: { main: "#D4D3D8", dark: "#8f8e93", light: "#f0eff4" },

______________________________________
*/
