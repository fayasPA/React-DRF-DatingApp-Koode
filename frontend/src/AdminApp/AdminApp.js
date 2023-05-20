import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Team from "./scenes/team";
import Form from "./scenes/form";
import Bar from "./scenes/Bar";
import Geography from "./scenes/Geography";
import Line from "./scenes/Line";
import Pie from "./scenes/Pie";
import PrivateRoutes from "./Utils/PrivateRouteS";
import Login from "./scenes/Login/Login";
import { Provider } from 'react-redux';
import store from './Redux/store';


function AdminApp() {
  const [theme, colorMode] = useMode();

  return ( 
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme} >
      <CssBaseline />
      <div className="app">
          <Provider store={store}>
          <Routes >
            <Route element={<PrivateRoutes />} >
              <Route index path="/" element={<Dashboard />} exact />
              <Route path="/team" element={<Team />}/>
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/geography" element={<Geography />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          </Provider>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminApp;
