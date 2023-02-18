import React from 'react';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MoviePage from './components/MoviePage';
import ErrorPage from './components/ErrorPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import WatchList from './components/WatchList.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { LoggedUserProvider } from './contexts/LoggedUser';
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<LoggedUserProvider><Home /></LoggedUserProvider>} errorElement={<ErrorPage />}></Route>
                <Route exact path='/movie/:id/' element={<LoggedUserProvider><MoviePage /></LoggedUserProvider>} errorElement={<ErrorPage />}></Route>
                <Route exact path='/signup' element={<AuthProvider><SignUp /></AuthProvider>} errorElement={<ErrorPage />}></Route>
                <Route exact path='/login' element={<AuthProvider><Login /></AuthProvider>} errorElement={<ErrorPage />}></Route>
                <Route exact path='/logout' element={<AuthProvider><Logout /></AuthProvider>} errorElement={<ErrorPage />}></Route>
                <Route exact path='/watchlist/:token' element={<LoggedUserProvider><WatchList /></LoggedUserProvider>} errorElement={<ErrorPage />}></Route>
            </Routes>
            <Footer />
        </>
    );
};

export default App;