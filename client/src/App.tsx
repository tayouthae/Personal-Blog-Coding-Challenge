import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';
import { Footer, NavComp } from './components';

axios.interceptors.request.use(
  (request) =>
    // Edit request config
    request,
  (error) =>
    // Edit response config
    Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

const Application: FC = () => {
  console.log(process.env.BASE_URL);

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL; // Base url according to the server url.
  axios.defaults.headers.post['Content-Type'] = 'application/json'; // default

  return (
    <BrowserRouter>
      <NavComp />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs/:blogID" element={<BlogPage />} />
        <Route path="/edit/:blogID" element={<EditPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Application;
