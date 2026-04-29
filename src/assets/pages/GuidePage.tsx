import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GUARDIAN_STEPS = [
  {
    step: 1,
    title: "회원가입",
    desc: "보호자로 회원가입을 진행해주세요.",
    detail: "상단 메뉴 '회원가입' 클릭 → 역할 '보호자' 선택 → 정보 입력 후 가입 완료",
    icon: "👤",
  },
  {
    step: 2,
    title: "간병 요청 등록",
    desc: "간병이 필요한 정보를 등록해주세요.",
    detail: "서비스 이용 → 간병인 요청 → 지역, 기간, 일당, 환자 정보 입력 후 등록",
    icon: "📋",
  },
  {
    step: 3,
    title: "신청자 확인",
    desc: "간병인들의 신청을 확인해주세요.",
    detail: "마이페이지 → 내 요청 목록 → 신청자 목록 버튼 클릭 → 간병인 프로필 확인",
    icon: "👥",
  },
  {
    step: 4,
    title: "간병인 수락",
    desc: "마음에 드는 간병인을 수락해주세요.",
    detail: "신청자 목록에서 간병인 프로필 확인 후 수락 버튼 클릭 → 나머지 신청자 자동 거절",
    icon: "✅",
  },
  {
    step: 5,
    title: "간병 시작",
    desc: "수락된 간병인과 간병을 시작하세요.",
    detail: "수락 후 간병인 연락처 확인 → 일정 조율 → 간병 시작",
    icon: "🏥",
  },
  {
    step: 6,
    title: "리뷰 작성",
    desc: "간병 완료 후 리뷰를 작성해주세요.",
    detail: "마이페이지 → 내 요청 목록 → 완료된 요청 → 리뷰 작성",
    icon: "⭐",
  },
];

const CAREGIVER_STEPS = [
  {
    step: 1,
    title: "회원가입",
    desc: "간병인으로 회원가입을 진행해주세요.",
    detail: "상단 메뉴 '회원가입' 클릭 → 역할 '간병인' 선택 → 정보 입력 후 가입 완료",
    icon: "👤",
  },
  {
    step: 2,
    title: "프로필 등록",
    desc: "경력, 자격증, 활동 지역을 등록해주세요.",
    detail: "마이페이지 → 간병인 프로필 → 경력, 자격증, 활동 지역, 자기소개 입력 후 저장",
    icon: "📝",
  },
  {
    step: 3,
    title: "일감 목록 조회",
    desc: "보호자들이 등록한 간병 요청을 확인하세요.",
    detail: "서비스 이용 → 간병인 요청 목록 → 지역, 날짜 필터로 원하는 요청 검색",
    icon: "🔍",
  },
  {
    step: 4,
    title: "간병 신청",
    desc: "원하는 요청에 신청해주세요.",
    detail: "요청 상세보기 → 신청하기 버튼 클릭 → 보호자 수락 대기",
    icon: "📨",
  },
  {
    step: 5,
    title: "수락 후 간병 시작",
    desc: "보호자가 수락하면 간병을 시작하세요.",
    detail: "마이페이지 → 내 신청 현황에서 수락 확인 → 보호자 연락처 확인 → 간병 시작",
    icon: "🏥",
  },
  {
    step: 6,
    title: "간병일지 작성",
    desc: "매일 간병일지를 작성해주세요.",
    detail: "마이페이지 → 활동 내역 → 간병일지 작성 → 보호자 확인 가능",
    icon: "✏️",
  },
];

const FAQS = [
  { q: "가입 후 바로 이용 가능한가요?", a: "네! 가입 즉시 서비스 이용이 가능합니다." },
  { q: "간병인 자격증이 없어도 되나요?", a: "자격증이 없어도 가입은 가능하지만 자격증 보유 시 매칭 확률이 높아집니다." },
  { q: "간병비는 어떻게 결제하나요?", a: "현재는 보호자와 간병인이 직접 협의하여 결제합니다." },
];

export default function GuidePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"보호자" | "간병인">("보호자");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = activeTab === "보호자" ? GUARDIAN_STEPS : CAREGIVER_STEPS;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>고객센터</p>
          <h1 style={{ fontSize: 24, fontWeight: 500, color: "#1a1a1a", margin: "0 0 10px" }}>이용가이드</h1>
          <p style={{ fontSize: 14, color: "#888" }}>케어매치 서비스 이용 방법을 안내드립니다.</p>
        </div>

        {/* 탭 */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", justifyContent: "center" }}>
          {(["보호자", "간병인"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 32px", fontSize: 14, borderRadius: 8, cursor: "pointer", fontWeight: 500,
                background: activeTab === tab ? "#185FA5" : "#fff",
                color: activeTab === tab ? "#fff" : "#888",
                border: activeTab === tab ? "none" : "0.5px solid #d0cec8",
              }}
            >
              {tab === "보호자" ? "👨‍👩‍👧 보호자" : "🧑‍⚕️ 간병인"}
            </button>
          ))}
        </div>

        {/* 스텝 */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {steps.map((s, i) => (
              <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

                {/* 왼쪽 스텝 번호 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "#185FA5", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 500,
                  }}>
                    {s.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 2, height: 32, background: "#E6F1FB", margin: "4px 0" }} />
                  )}
                </div>

                {/* 오른쪽 내용 */}
                <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1rem 1.25rem", flex: 1, marginBottom: i < steps.length - 1 ? 0 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#E6F1FB", color: "#185FA5" }}>
                      Step {s.step}
                    </span>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{s.title}</p>
                  </div>
                  <p style={{ fontSize: 13, color: "#888", margin: "0 0 6px" }}>{s.desc}</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: 0, lineHeight: 1.6, background: "#f8f7f4", padding: "8px 10px", borderRadius: 8 }}>
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 자주하는 질문 */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", marginBottom: "1rem" }}>자주하는 질문</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>Q. {faq.q}</span>
                  <span style={{ fontSize: 18, color: "#aaa", transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 1.25rem 1rem", borderTop: "0.5px solid #e8e6e0" }}>
                    <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: "1rem 0 0" }}>A. {faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 CTA */}
        <div style={{ background: "#E6F1FB", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#185FA5", marginBottom: 6 }}>
            {activeTab === "보호자" ? "지금 바로 간병인을 찾아보세요!" : "지금 바로 일감을 찾아보세요!"}
          </p>
          <p style={{ fontSize: 13, color: "#378ADD", marginBottom: 16 }}>
            케어매치와 함께 믿을 수 있는 간병 서비스를 경험하세요.
          </p>
          <button
            onClick={() => navigate(activeTab === "보호자" ? "/careRequest" : "/careRequestList")}
            style={{ padding: "10px 28px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            {activeTab === "보호자" ? "간병 요청하기 →" : "일감 찾기 →"}
          </button>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
