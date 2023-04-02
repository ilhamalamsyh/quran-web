/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Home } from "./features/quran/Home";
import { theme } from "./styles/theme";
import { SuratDetail } from "./features/quran/SuratDetail";
import { Imsakiyah } from "./features/imsakiyah/Imsakiyah";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={"/surat/:nomor"} component={SuratDetail} />
          <Route exact path={"/imsakiyah"} component={Imsakiyah} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
