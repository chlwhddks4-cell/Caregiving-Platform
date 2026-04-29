// src/components/Header.jsx
import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b relative z-50">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-2">

        {/* 로고 */}
        <div className="font-bold text-lg">프라임케어</div>

        {/* 메뉴 */}
        <nav className="flex gap-8 text-sm text-gray-700 relative">

          {/* 서비스 이용 */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span className="cursor-pointer">서비스 이용</span>

            {/* 드롭다운 */}
            {open && (
              <div className="absolute top-8 left-0 w-44 bg-white shadow-lg rounded-xl p-2 border animate-fadeIn">
                
                <MenuItem text="간병인 요청" active />
                <MenuItem text="간병인 등록" />
                <MenuItem text="동행매니저 요청" />
                <MenuItem text="동행매니저 등록" />

              </div>
            )}
          </div>

          <span>교육센터</span>
          <span>쇼핑몰</span>
          <span>고객센터</span>
        </nav>

        {/* 로그인 */}
        <div className="flex gap-2">
          <button className="text-sm">로그인</button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            회원가입
          </button>
        </div>

      </div>
    </header>
  );
}

// 메뉴 아이템
function MenuItem({ text, active }:any) {
  return (
    <div
      className={`px-4 py-2 rounded-lg text-sm cursor-pointer
      ${active ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
    >
      {text}
    </div>
  );
}