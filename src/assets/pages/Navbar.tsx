import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { useAuth }  from './context/AuthContext';  // 알림판 가져오기






export default function Navbar() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
// const [user, setUser] = useState<{ name: string; role: string } | null>(null);

const { isLoggedIn, user, logout } = useAuth();  // 알림판 읽기

// 로그인 성공 시
const handleLoginSuccess = (userData: { name: string; role: string }) => {
  // setIsLoggedIn(true);
  // setUser(userData);
  localStorage.setItem('token', '발급받은JWT토큰');
};

// 로그아웃 시
const handleLogout = () => {
   
    logout();  // 알림판의 로그아웃 함수 호출
    navigate('/');
};

const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white font-black text-sm">
            C
          </div>
          <div className="leading-tight">
            <span className="text-blue-600 font-black text-lg">Care</span>
            <span className="text-gray-800 font-black text-lg">Match</span>
            <div className="text-gray-400 text-[10px] font-medium -mt-1">
              CareMatch
            </div>
          </div>
        </div>
        </Link>
        
        {/* PC 메뉴 */}
      
          <ul className="hidden md:flex gap-8 list-none">

            {/* ✅ 서비스 이용 (드롭다운 추가된 부분🔥) */}
            <li className="relative group">
              <button className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                서비스 이용
              </button>


              {/* 드롭다운 */}
              <div className="
             absolute left-1/2 -translate-x-1/2 mt-3 w-44
                bg-white rounded-xl shadow-lg border border-gray-100
                opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-200 z-50
              ">
                <ul className="py-2 text-sm text-gray-700 text-center">
                    {[
                        { name: "간병인 요청", path: "/careRequestList" },
                        { name: "간병인 등록", path: "/careRequest" }
                    ].map((item) => (
                        <li key={item.name}>
                        <Link
                            to={item.path}
                            className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600"
                        >
                            {item.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
              </div>
            </li>

              {/* ✅ 서비스 이용 (드롭다운 추가된 부분🔥) */}
            <li className="relative group">
              <button className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                CareMatch 소개
              </button>

              {/* 드롭다운 */}
                <div className="
                absolute left-1/2 -translate-x-1/2 mt-3 w-44
                    bg-white rounded-xl shadow-lg border border-gray-100
                    opacity-0 invisible translate-y-2
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-200 z-50
                  ">
                    <ul className="py-2 text-sm text-gray-700 text-center">
                        {[
                            { name: "CareMatch 소개", path: "/servicePage" }
                        ].map((item) => (
                            <li key={item.name}>
                            <Link
                                to={item.path}
                                className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600"
                            >
                                {item.name}
                            </Link>
                            </li>
                        ))}
                        </ul>
                  </div>
            </li>

            

              <li className="relative group">
              <button className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                고객센터
              </button>

              {/* 드롭다운 */}
              <div className="
             absolute left-1/2 -translate-x-1/2 mt-3 w-44
                bg-white rounded-xl shadow-lg border border-gray-100
                opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-200 z-50
              ">
                 <ul className="py-2 text-sm text-gray-700 text-center">
                  {[
                    { name: "공지사항", path: "/noticeGrid", tab: "공지사항" },
                    { name: "자료실", path: "/noticeGrid", tab: "자료실" },
                    { name: "자주하는 질문", path: "/faq", tab: null },
                    { name: "이용가이드", path: "/guide", tab: null },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        state={{ tab: item.tab }}
                        className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>



          </ul>

        {/* PC 버튼 */}
        <div className="hidden md:flex items-center gap-2">
          {/* 로그인전 */}
          {!isLoggedIn ? (
              <>
          <button  onClick={() =>  navigate('/auth?tab=login')}
          className="px-4 py-1.5 text-sm font-semibold text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50">
            로그인
          </button>
          <button  onClick={() =>  navigate('/auth?tab=register')}
          className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            회원가입
          </button>
          </>
          ) : (
            <>
            {/* 로그인후 */}
          <button  onClick={() =>  navigate('/mypage')}
            className="px-4 py-1.5 text-sm font-semibold text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50">
              내정보
            </button>
            <button  onClick={() =>  handleLogout()}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              로그아웃
          </button>
        </>
          )}
      
            
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

    {/* 모바일 메뉴 */}
        {open && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">

            {/* 메뉴 항목 */}
            {[
              { name: "서비스 이용", items: [
                { name: "간병인 요청", path: "/careRequestList" },
                { name: "간병 요청하기", path: "/careRequest" },
              ]},
              { name: "CareMatch 소개", items: [
                { name: "서비스 소개", path: "/servicePage" },
              ]},
              { name: "고객센터", items: [
                { name: "공지사항", path: "/noticeGrid", tab: "공지사항" },
                { name: "자료실", path: "/noticeGrid", tab: "자료실" },
                { name: "자주하는 질문", path: "/faq" },
                { name: "이용가이드", path: "/guide" },
              ]},
            ].map((menu) => (
              <div key={menu.name}>
                <p className="text-sm font-semibold text-gray-800 mb-2">{menu.name}</p>
                {menu.items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      navigate(item.path, { state: { tab: item.tab || null } });
                      setOpen(false);
                    }}
                    className="text-sm text-gray-500 py-1.5 pl-2 cursor-pointer hover:text-blue-600"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            ))}

            {/* 로그인/로그아웃 버튼 */}
            <div className="flex gap-2 pt-2 border-t">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => { navigate("/mypage"); setOpen(false); }}
                    className="flex-1 border py-2 rounded text-blue-600 text-sm"
                  >
                    내정보
                  </button>
                  <button
                    onClick={() => { logout(); navigate("/"); setOpen(false); }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded text-sm"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { navigate('/auth?tab=login'); setOpen(false); }}
                    className="flex-1 border py-2 rounded text-blue-600 text-sm"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => { navigate('/auth?tab=register'); setOpen(false); }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded text-sm"
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>

          </div>
        )}
    </nav>
  );
}