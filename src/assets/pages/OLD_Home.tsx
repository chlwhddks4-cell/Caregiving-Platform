import { useState } from "react";
import { Link } from "react-router-dom";

// ─── DATA ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: "전일 방문자", value: "47", unit: "명" },
  { label: "금일 방문자", value: "36", unit: "명" },
  { label: "누적 방문자", value: "4,782", unit: "명" },
  { label: "간병인 회원 수", value: "243", unit: "명" },
  { label: "간병인 배정 수", value: "186", unit: "건" },
];

const QUICK_MENUS = [
  { title: "간병인 요청", emoji: "👩‍⚕️", from: "from-blue-100", to: "to-blue-200", text: "text-blue-800" },
  { title: "간병인 등록", emoji: "📋", from: "from-emerald-100", to: "to-emerald-200", text: "text-emerald-800" },
  { title: "동행매니저 요청", emoji: "🤝", from: "from-amber-100", to: "to-amber-200", text: "text-amber-800" },
  { title: "동행매니저 등록", emoji: "💼", from: "from-pink-100", to: "to-pink-200", text: "text-pink-800" },
];

const SHORTCUTS = [
  { icon: "📄", label: "입퇴원확인서\n전송", bg: "bg-blue-50" },
  { icon: "✏️", label: "간병일지\n작성", bg: "bg-amber-50" },
  { icon: "🎁", label: "추천 코드\n전송", bg: "bg-pink-50" },
  { icon: "🧳", label: "업무\n지원", bg: "bg-emerald-50" },
  { icon: "🛒", label: "쇼핑몰\n바로가기", bg: "bg-yellow-50" },
  { icon: "🏅", label: "간병인 이수증\n발급", bg: "bg-purple-50" },
  { icon: "👤", label: "간병인 경력\n증명서", bg: "bg-blue-50" },
  { icon: "📝", label: "동행매니저\n등록", bg: "bg-emerald-50" },
];

const NEWS_TABS = ["전체", "공지", "이벤트", "자료실"];
const NEWS = [
  { tag: "이벤트", tagStyle: "bg-pink-100 text-pink-700", title: "홈페이지 개설 이벤트 - 회원가입 추천인 이벤트", date: "2026-01-20" },
  { tag: "공지", tagStyle: "bg-blue-100 text-blue-700", title: "간병보험 관련 유의사항 [주요 민원사례로 알아보는 소비자 유의...]", date: "2026-01-19" },
  { tag: "공지", tagStyle: "bg-blue-100 text-blue-700", title: "[동행 매니저 자격증] 강의 서비스 오픈", date: "2026-01-19" },
];

const JOBS = [
  { date: "26-04-15", name: "오**", age: 69, gender: "여", careDate: "26-04-16", area: "고양시" },
  { date: "26-04-11", name: "김**", age: 62, gender: "여", careDate: "26-04-13", area: "김해시" },
  { date: "26-04-08", name: "정**", age: 62, gender: "여", careDate: "26-04-08", area: "노원구" },
  { date: "26-04-07", name: "박**", age: 84, gender: "여", careDate: "26-04-08", area: "종로구" },
  { date: "26-04-05", name: "노**", age: 79, gender: "여", careDate: "26-04-06", area: "강남구" },
];

const GUIDES = [
  { icon: "💻", title: "회원가입 방법 안내", desc: "회원가입 하시는 방법을 안내드립니다." },
  { icon: "📋", title: "간병인 신청 방법 안내", desc: "간병인을 요청하고 등록하는 방법을 안내드립니다." },
  { icon: "📅", title: "간병일지 작성방법 안내", desc: "간병 사실 증빙에 필수적인 간병일지 작성 방법을 안내드립니다." },
];

// ─── SUB COMPONENTS ────────────────────────────────────────────────────────






function Hero() {
  return (
     <Link to="/servicePage">
      <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-green-50 px-6 py-14">
        
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
           
          <div className="flex-1">
            <h1 className="text-3xl font-black text-slate-800 leading-snug mb-3">
              믿고 맡길 수 있는 간병 서비스<br />
              <span className="text-blue-600">프라임케어</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              간병인 매칭부터 간병보험 청구까지,<br />복잡한 절차 없이 빠르고 간편하게 이용하세요.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
              자세히보기 →
            </button>
          </div>
          <div className="hidden md:flex w-64 h-44 rounded-2xl bg-gradient-to-br from-blue-200 to-emerald-100 items-center justify-center text-6xl shadow-xl flex-shrink-0">
          </div>
           
        </div>
        
      </div>
      </Link>
    
  );
}



function StatsSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">

        {/* 상단 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            📊 플랫폼 이용현황
            <span className="text-blue-500 cursor-pointer hover:rotate-180 transition-transform inline-block">
              🔄
            </span>
          </h3>

          <span className="text-xs text-gray-400">
            2026-04-17 기준
          </span>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-gray-50 rounded-xl p-3 md:p-4 text-center"
            >
              <div className="text-xs text-gray-500 mb-1">
                {s.label}
              </div>

              <div className="text-lg md:text-2xl font-black text-blue-600">
                {s.value}
                <span className="text-xs md:text-sm text-gray-500 font-medium ml-0.5">
                  {s.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function QuickMenus() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-5">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_MENUS.map((q) => (
          <div
            key={q.title}
            className={`bg-gradient-to-br ${q.from} ${q.to} rounded-2xl 
            p-4 md:p-5 min-h-[120px] md:min-h-[148px] 
            flex flex-col justify-between cursor-pointer
            hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}
          >
            
            {/* 상단 */}
            <div>
              <h3 className={`text-sm md:text-base font-bold ${q.text}`}>
                {q.title}
              </h3>

              <div className={`mt-2 w-6 h-6 md:w-7 md:h-7 rounded-lg bg-black/10 flex items-center justify-center text-xs md:text-sm ${q.text}`}>
                ↗
              </div>
            </div>

            {/* 아이콘 */}
            <div className="text-3xl md:text-5xl self-end opacity-90">
              {q.emoji}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

function Shortcuts() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 md:px-8 py-5">
        
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {SHORTCUTS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 cursor-pointer 
              px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              
              {/* 아이콘 */}
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${s.bg} 
                flex items-center justify-center text-xl md:text-2xl`}
              >
                {s.icon}
              </div>

              {/* 텍스트 */}
              <span className="text-[10px] md:text-[11px] text-gray-500 font-medium text-center leading-tight break-keep">
                {s.label}
              </span>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


function NewsSection() {
  const [activeTab, setActiveTab] = useState("전체");

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-7">

      {/* 상단 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        
        <h2 className="text-base font-bold text-gray-800">
          프라임케어 최근 소식
        </h2>

        {/* 탭 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {NEWS_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeTab === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      {/* 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NEWS.map((n, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-3 ${n.tagStyle}`}
            >
              {n.tag}
            </span>

            <h4 className="text-sm font-semibold text-gray-800 leading-relaxed mb-2">
              {n.title}
            </h4>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{n.date}</span>
              <span className="text-gray-400 text-sm">↗</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}


function JobsSection() {
  const [activeFilter, setActiveFilter] = useState("간병인");
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-7">

      {/* 제목 */}
      <h2 className="text-base font-bold text-gray-800 mb-4">
        실시간 일감 찾기
      </h2>

      <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] gap-6">

        {/* 좌측 필터 */}
        <div className="flex lg:block gap-2 overflow-x-auto lg:overflow-visible">
          {["간병인", "동행매니저"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-2 lg:px-5 lg:py-3.5 min-w-[220px] rounded-xl border text-sm font-semibold flex justify-between items-center transition-colors ${
                activeFilter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {f} <span className="ml-2">›</span>
            </button>
          ))}
        </div>

        {/* 테이블 */}
        <div>

          {/* 모바일 카드형 */}
          <div className="block md:hidden space-y-3">
            {JOBS.map((j, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">접수일</span>
                  <span>{j.date}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">환자명</span>
                  <span>{j.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">나이</span>
                  <span>{j.age}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">성별</span>
                  <span>{j.gender}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">간병일</span>
                  <span>{j.careDate}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-400">지역</span>
                  <span>{j.area}</span>
                </div>

                <button className="w-full py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg">
                  지원하기
                </button>
              </div>
            ))}
          </div>

          {/* PC 테이블 */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["접수일", "환자명", "나이", "성별", "간병일", "지역", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-bold text-gray-500 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {JOBS.map((j, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm">{j.date}</td>
                    <td className="px-4 py-3 text-sm">{j.name}</td>
                    <td className="px-4 py-3 text-sm">{j.age}</td>
                    <td className="px-4 py-3 text-sm">{j.gender}</td>
                    <td className="px-4 py-3 text-sm">{j.careDate}</td>
                    <td className="px-4 py-3 text-sm">{j.area}</td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg">
                        지원하기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-1 mt-4">
            {["«", "‹", 1, 2, 3, 4, 5, "›", "»"].map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === "number" && setActivePage(p)}
                className={`w-8 h-8 rounded-lg text-xs border flex items-center justify-center ${
                  activePage === p
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function GuideSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-7">
      <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 md:p-10 text-center">

        {/* 제목 */}
        <h2 className="text-lg md:text-xl font-black text-slate-800 mb-5 md:mb-6">
          프라임케어가 처음이신가요?
        </h2>

        {/* 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GUIDES.map((g) => (
            <div
              key={g.title}
              className="bg-white rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 text-left shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              
              {/* 아이콘 */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0">
                {g.icon}
              </div>

              {/* 텍스트 */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">
                  {g.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {g.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function SupportSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-5 mb-10">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* 일반 카드 */}
        {[
          { icon: "📞", label: "전화문의" },
          { icon: "❓", label: "자주하는 질문" },
          { icon: "💬", label: "카카오상담" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <span className="text-2xl md:text-3xl">{s.icon}</span>
            <span className="text-sm font-semibold text-gray-700 text-center">
              {s.label}
            </span>
          </div>
        ))}

        {/* 고객센터 카드 */}
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 col-span-2 md:col-span-1">
          
          <div className="mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              365 고객지원센터
            </span>
          </div>

          <div className="text-lg md:text-xl font-black text-blue-600 mb-2">
            1866-1004
          </div>

          <p className="text-[11px] md:text-xs text-gray-400 leading-5 md:leading-6">
            월~금 | 09:00 ~ 22:00<br />
            토요일 | 09:00 ~ 18:00<br />
            일요일·공휴일 | 09:00 ~ 18:00
          </p>

        </div>

      </div>

    </div>
  );
}



// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function OLD_Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      <Hero />
      <StatsSection />
      <QuickMenus />
      <Shortcuts />
      <NewsSection />
      <JobsSection />
      <GuideSection />
      <SupportSection />

    </div>
  );
}
