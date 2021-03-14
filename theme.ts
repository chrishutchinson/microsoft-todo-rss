import { Theme } from "theme-ui";

const getHeadingStyle = (fontSize: number | number[]) => ({
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
  fontStyle: "italic",
  fontSize,
});

const theme: Theme = {
  colors: {
    text: "#4D4847",
    background: "#F4FFF8",
    primary: "#000F08",
    secondary: "#1C3738",
    highlight: "#8BAAAD",
    buff: "#fff",
    alert: "#FEDCD8",
    modes: {
      dark: {
        text: "#F4FFF8",
        background: "#000F08",
        primary: "#F4FFF8",
        buff: "#333",
      },
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Cormorant Garamond", sans-serif',
    monospace: "monospace",
  },
  fontSizes: [12, 14, 16, 20, 26, 34, 48, 60, 86],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  sizes: {
    container: 1024,
  },
  layout: {
    container: {
      paddingLeft: 3,
      paddingRight: 3,
    },
    contentContainer: {
      maxWidth: 800,
      paddingLeft: 3,
      paddingRight: 3,
    },
    centered: {
      textAlign: "center",
    },
  },
  buttons: {
    buttonAction: {
      variant: "links.button",
      backgroundColor: "primary",
      color: "background",
      ":hover": {
        backgroundColor: "secondary",
      },
    },
  },
  links: {
    button: {
      backgroundColor: "primary",
      color: "background",
      padding: 2,
      paddingLeft: 3,
      paddingRight: 3,
      textDecoration: "none",
      borderRadius: 5,
      fontFamily: "body",
      border: "2px solid",
      borderColor: "primary",
      ":hover": {
        borderColor: "secondary",
        backgroundColor: "secondary",
      },
    },
    buttonDanger: {
      variant: "links.button",
      backgroundColor: "alert",
      color: "text",
      ":hover": {
        backgroundColor: "buff",
      },
    },
    secondaryButton: {
      variant: "links.button",
      background: "transparent",
      color: "text",
      ":hover": {
        backgroundColor: "transparent",
        borderColor: "text",
      },
    },
  },
  messages: {
    error: {
      backgroundColor: "alert",
    },
  },
  cards: {
    primary: {
      backgroundColor: "buff",
      padding: 4,
      borderRadius: 8,
      boxShadow: "0 0 4px rgba(0, 0, 0, 0.125)",
    },
  },
  text: {
    default: {
      color: "text",
      fontSize: 2,
      fontFamily: "body",
      lineHeight: "body",
    },
    heading1: getHeadingStyle([6, 7]),
    heading2: getHeadingStyle([4, 6]),
    heading3: getHeadingStyle([4, 5]),
    heading4: getHeadingStyle([3, 4]),
    heading5: getHeadingStyle([2, 3]),
    heading6: getHeadingStyle(2),
  },
  styles: {
    root: {
      margin: 0,
    },
    a: {
      color: "primary",
      ":hover": {
        color: "secondary",
      },
    },
  },
};

export default theme;
