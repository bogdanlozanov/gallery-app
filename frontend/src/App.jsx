import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";
import ImageDetails from "./pages/ImageDetails";
import UploadImage from "./pages/UploadImage";

const App = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/image/:id" element={<ImageDetails />} />
                <Route path="/upload" element={<UploadImage />} />
            </Routes>
        </Router>
    </ThemeProvider>
);

export default App;
