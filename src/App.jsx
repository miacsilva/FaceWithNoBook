import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx";
import LoginPage from "./scenes/loginPage/index.jsx";
import ProfilePage from "./scenes/profilePage/index.jsx";
import {useMemo} from "react";
import { useSelector} from "react-redux";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeSettings } from "/theme.jsx";


function App() {

  const mode = useSelector((state) => state.mode); //grabbing the value of "mode" created on "Initial State" at state/index.js. I'm using useSelector to grab it
  const theme = useMemo(()=> createTheme(ThemeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return  <div className='app'>

      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />}/>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>

       </div>
  
}

export default App;
