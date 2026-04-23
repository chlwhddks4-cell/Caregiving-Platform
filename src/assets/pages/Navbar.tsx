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
            P
          </div>
          <div className="leading-tight">
            <span className="text-blue-600 font-black text-lg">Prime</span>
            <span className="text-gray-800 font-black text-lg">care</span>
            <div className="text-gray-400 text-[10px] font-medium -mt-1">
              프라임케어
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
               absolute left-1/2 -translate-x-1/2 mt-3 w-40
                bg-white rounded-xl shadow-lg border border-gray-100
                opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-200 z-50
              ">
                <ul className="py-2 text-sm text-gray-700 text-center">
                  {[
                    "간병인 요청",
                    "간병인 등록",
                    "동행매니저 요청",
                    "동행매니저 등록",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 ">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

              {/* ✅ 서비스 이용 (드롭다운 추가된 부분🔥) */}
            <li className="relative group">
              <button className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                교육센터
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
                    "교육센터",
                    "전문간병사 이수증",
                    "손해보험사 기출문제",
                    "생명보험사 기출문제",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 ">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

              <li className="relative group">
              <button className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                쇼핑몰
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
                    "쇼핑몰 바로가기",
                    "건강식품",
                    "기프티콘",
                    "텀블러",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 ">
                        {item}
                      </a>
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
                        { name: "공지사항", path: "/noticeGrid" },
                        { name: "자주하는 질문", path: "/noticeGrid" },
                        { name: "자료실", path: "/test_NoticeGrid" },
                        { name: "이용가이드", path: "/guide" },
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
          {["서비스 이용", "교육센터", "쇼핑몰", "고객센터"].map((m) => (
            <div key={m} className="text-sm text-gray-700">
              {m}
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <button className="flex-1 border py-2 rounded text-blue-600">
              로그인
            </button>
            <button
            className="flex-1 bg-blue-600 text-white py-2 rounded">
              회원가입
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}