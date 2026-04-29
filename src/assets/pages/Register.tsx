// src/pages/Register.jsx
import React from "react";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-4">
          <h1 className="text-xl font-bold text-blue-600">프라임케어</h1>
          <div className="space-x-3">
            <button className="text-sm text-gray-600">로그인</button>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              회원가입
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-3xl mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
          <p className="text-gray-500">
            서비스 이용을 위해 정보를 입력해주세요
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6 space-y-6">
          
          {/* 이용약관 */}
          <div>
            <h3 className="font-semibold mb-2">이용 약관</h3>
            <textarea
              className="w-full h-28 border rounded p-3 text-sm text-gray-600"
              readOnly
              value="서비스 이용약관 내용..."
            />
          </div>

          {/* 개인정보 */}
          <div>
            <h3 className="font-semibold mb-2">
              개인정보 수집 및 이용목적
            </h3>
            <textarea
              className="w-full h-28 border rounded p-3 text-sm text-gray-600"
              readOnly
              value="개인정보 처리방침 내용..."
            />
          </div>

          {/* 동의 */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">위 약관에 모두 동의합니다.</span>
          </div>

          {/* 입력폼 */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="이름"
              className="w-full border p-3 rounded"
            />
            <input
              type="email"
              placeholder="이메일"
              className="w-full border p-3 rounded"
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* 버튼 */}
          <div className="text-center">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              가입하기
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}