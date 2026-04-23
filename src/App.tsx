import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Register from "./assets/pages/Register.tsx";
import Home from "./assets/pages/Home.tsx";
import Layout from "./assets/pages/Layout.tsx";
import NoticePage from "./assets/pages/div_NoticePage.tsx";
import NoticeGrid from "./assets/pages/NoticeGrid.tsx";
import ServicePage from "./assets/pages/ServicePage.tsx";
import WritePage from "./assets/pages/WritePage.tsx";
import DetailPage from "./assets/pages/DetailPage.tsx";
import Test_NoticeGrid22 from "./assets/pages/test_NoticeGrid.tsx";

import Auth from "./assets/pages/auth/Auth.tsx";
import FindAccount from "./assets/pages/auth/FindAccount.tsx"; 

import { AuthProvider } from './assets/pages/context/AuthContext.tsx';

import MyPage from "./assets/pages/auth/MyPage.tsx";

import './App.css'


function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/noticePage" element={<NoticePage />} />
            <Route path="/noticeGrid" element={<NoticeGrid />} />

            <Route path="/test_NoticeGrid" element={<Test_NoticeGrid22 />} />
            <Route path="/servicePage" element={<ServicePage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/find-account" element={<FindAccount />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
