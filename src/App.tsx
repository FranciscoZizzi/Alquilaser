import React from 'react';
import './App.css';
import ResultPage from "./pages/result";
import HomePage from "./pages/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import ListingPage from "./pages/listing";
import ProfileInfoPage from "./pages/profile/info";
import ListingInfoPage from "./pages/listing/info";
import ForgotPasswordPage from "./pages/forgotPassword";
import ResetPasswordPage from "./pages/resetPassword";
import StoreTokenPage from "./pages/storeToken";
import ConfirmEmailValidation from "./pages/confirmEmailValidation";
import Index from "./pages/validateEmail";
import CompleteGoogleLoginPage from "./pages/completeGoogleLogin";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/search-results'} element={<ResultPage/>}/>
                    <Route path={'/register'} element={<RegisterPage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/profile'} element={<ProfilePage/>}/>
                    <Route path={'/listing/:listingId'} element={<ListingPage/>}/>
                    <Route path={'/listing/info/:listingId'} element={<ListingInfoPage/>}/>
                    <Route path={'/profile/info'} element={<ProfileInfoPage/>}/>
                    <Route path={'/forgot_password'} element={<ForgotPasswordPage/>}/>
                    <Route path={'/reset_password/:id/:token'} element={<ResetPasswordPage/>}/>
                    <Route path={'/google-login/:token'} element={<CompleteGoogleLoginPage/>}/>
                    <Route path={'/store-token/:token'} element={<StoreTokenPage/>}/>
                    <Route path={'/confirm_email_validation/:id/:token'} element={<ConfirmEmailValidation/>}/>
                    <Route path={'/validate_email'} element={<Index/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
