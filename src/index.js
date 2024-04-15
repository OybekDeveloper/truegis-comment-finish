import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducer/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-input-2/lib/style.css";
import { YMaps } from "react-yandex-maps";
import { createTheme, ThemeProvider } from "@mui/material";

function MuiCustomization({ children }) {
  const theme = {
    components: {
      MuiButton: {
        defaultProps: { variant: "contained", disableElevation: true },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <MuiCustomization> */}
          {/* <YMaps
            query={{
              apikey: "29294198-6cdc-4996-a870-01e89b830f3e",
              lang: "en_RU",
            }}
          > */}
            <App />
          {/* </YMaps> */}
        {/* </MuiCustomization> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
