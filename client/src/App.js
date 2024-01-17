import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import {useMemo} from "react";
import { useSelector } from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme } from "@mui/material/styles";
import SearchPage from "scenes/search";
import { themeSettings } from "./theme";
import Search from "scenes/search";
function App(){
    const mode = useSelector((state) => state.mode); //grabs our intialstate (the value we created in intialstate)
    const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]); //configures theme only rerenders if the mode arguement in the second parameter changes 
    const isAuth = Boolean(useSelector((state) => state.token)); //checks if token exists then it is authorized 
    return( <div className="app">
        <BrowserRouter>
        <ThemeProvider theme= {theme}>
            {/* //this is why we are able to use the "useTheme() in all of code" */}
            <CssBaseline /> 
            {/* //reset our CSS to basic Css  */}
            <Routes>
                <Route path= "/" element = {<LoginPage/>} />
                <Route path= "/home" element = {isAuth ? <HomePage/> : <Navigate to = "/"/>} />
                <Route path= "/search/:firstName" element = {isAuth ? <SearchPage/> : <Navigate to = "/"/>} />

                <Route path= "/profile/:userId" element = {isAuth ? <ProfilePage/> : <Navigate to = "/"/>} />
            </Routes>
        </ThemeProvider>
        </BrowserRouter>
    </div>
    )
}

export default App;