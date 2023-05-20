import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import PrivateRoutes from "./Utils/PrivateRouteS";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MatchesPage from "./Pages/MatchesPage";
import MessagePage from "./Pages/MessagePage";
import NotificationPage from "./Pages/NotificationPage";
import AccountsPage from "./Pages/AccountsPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <div className="App">
            <Routes>
              <Route element={<PrivateRoutes />} >
                <Route path="/" element={<HomePage />} exact/>
                  <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/messages" element={<MessagePage />} />
                <Route path="/notification" element={<NotificationPage />} />
              </Route>
              < Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={< SignUpPage />} />
            </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
