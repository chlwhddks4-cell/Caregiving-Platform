import { useState } from "react";

const FAQ_DATA = [
  // 공통
  {
    category: "공통",
    question: "회원가입은 어떻게 하나요?",
    answer: "상단 메뉴의 '회원가입' 버튼을 클릭하신 후 보호자 또는 간병인으로 역할을 선택하고 정보를 입력하시면 됩니다."
  },
  {
    category: "공통",
    question: "아이디/비밀번호를 잊어버렸어요.",
    answer: "로그인 페이지에서 '아이디/비밀번호 찾기'를 클릭하시면 가입 시 등록한 이메일로 안내 메일이 발송됩니다."
  },
  {
    category: "공통",
    question: "회원 탈퇴는 어떻게 하나요?",
    answer: "마이페이지 → 내 정보 → 하단 '탈퇴하기' 버튼을 클릭하시면 됩니다. 탈퇴 시 모든 데이터는 삭제되며 복구할 수 없습니다."
  },
  {
    category: "공통",
    question: "개인정보는 안전하게 보호되나요?",
    answer: "모든 개인정보는 암호화되어 저장되며, 관련 법령에 따라 철저히 관리됩니다. 자세한 내용은 개인정보처리방침을 확인해주세요."
  },
  // 보호자
  {
    category: "보호자",
    question: "간병인 요청은 어떻게 하나요?",
    answer: "상단 메뉴 '서비스 이용' → '간병인 요청'을 클릭하신 후 지역, 기간, 일당 등을 입력하시면 됩니다. 등록된 요청은 간병인들이 확인하고 신청할 수 있습니다."
  },
  {
    category: "보호자",
    question: "간병인 신청을 수락/거절하려면?",
    answer: "마이페이지 → 내 요청 목록에서 등록한 요청을 클릭하신 후 '신청자 목록'에서 간병인 프로필을 확인하고 수락 또는 거절하실 수 있습니다."
  },
  {
    category: "보호자",
    question: "간병인이 마음에 안 들면 어떻게 하나요?",
    answer: "수락 후 간병이 시작되기 전이라면 취소가 가능합니다. 간병 중에 문제가 발생한 경우 고객센터(1866-1004)로 연락해주시면 도움을 드리겠습니다."
  },
  {
    category: "보호자",
    question: "간병 완료 후 리뷰는 어떻게 작성하나요?",
    answer: "간병 완료 후 마이페이지 → 내 요청 목록에서 완료된 요청을 클릭하시면 리뷰 작성 버튼이 활성화됩니다."
  },
  // 간병인
  {
    category: "간병인",
    question: "간병인으로 등록하려면?",
    answer: "회원가입 시 역할을 '간병인'으로 선택하신 후 마이페이지 → 간병인 프로필에서 경력, 자격증, 활동 지역 등을 등록하시면 됩니다."
  },
  {
    category: "간병인",
    question: "자격증 인증은 어떻게 하나요?",
    answer: "마이페이지 → 간병인 프로필에서 자격증 정보를 입력하신 후 관리자 확인을 거쳐 인증 마크가 부여됩니다. 인증까지 1~3 영업일이 소요됩니다."
  },
  {
    category: "간병인",
    question: "일감은 어디서 확인하나요?",
    answer: "상단 메뉴 '서비스 이용' → '간병인 요청' 목록에서 보호자들이 등록한 요청을 확인하실 수 있습니다. 지역, 날짜 등으로 필터링도 가능합니다."
  },
  {
    category: "간병인",
    question: "신청 후 수락 여부는 어떻게 확인하나요?",
    answer: "마이페이지 → 내 신청 현황에서 신청한 요청의 수락/거절/대기중 상태를 확인하실 수 있습니다. 수락 시 이메일로도 알림이 발송됩니다."
  },
];

const TABS = ["전체", "공통", "보호자", "간병인"];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("전체");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [keyword, setKeyword] = useState("");

  const filtered = FAQ_DATA.filter((faq) => {
    const tabMatch = activeTab === "전체" || faq.category === activeTab;
    const keywordMatch = !keyword || faq.question.includes(keyword) || faq.answer.includes(keyword);
    return tabMatch && keywordMatch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>고객센터</p>
          <h1 style={{ fontSize: 24, fontWeight: 500, color: "#1a1a1a", margin: "0 0 10px" }}>자주하는 질문</h1>
          <p style={{ fontSize: 14, color: "#888" }}>궁금한 점을 빠르게 해결해드릴게요.</p>
        </div>

        {/* 검색창 */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#aaa" }}>🔍</span>
          <input
            type="text"
            placeholder="궁금한 내용을 검색해보세요"
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setOpenIndex(null); }}
            style={{
              width: "100%", padding: "12px 16px 12px 42px",
              fontSize: 14, color: "#1a1a1a",
              background: "#fff", border: "0.5px solid #d0cec8",
              borderRadius: 10, outline: "none",
            }}
          />
          {keyword && (
            <button
              onClick={() => setKeyword("")}
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa" }}
            >
              ✕
            </button>
          )}
        </div>

        {/* 탭 */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
              style={{
                padding: "7px 16px", fontSize: 13, borderRadius: 20, cursor: "pointer", fontWeight: 500,
                background: activeTab === tab ? "#185FA5" : "#fff",
                color: activeTab === tab ? "#fff" : "#888",
                border: activeTab === tab ? "none" : "0.5px solid #d0cec8",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 결과 수 */}
        <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
          총 {filtered.length}개의 질문이 있습니다.
        </p>

        {/* FAQ 목록 */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#aaa", fontSize: 14, background: "#fff", borderRadius: 12, border: "0.5px solid #e8e6e0" }}>
            검색 결과가 없습니다.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((faq, i) => (
              <div
                key={i}
                style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, overflow: "hidden" }}
              >
                {/* 질문 */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%", padding: "1rem 1.25rem",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer", gap: 12, textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap",
                      background: faq.category === "보호자" ? "#E6F1FB" : faq.category === "간병인" ? "#E1F5EE" : "#F1EFE8",
                      color: faq.category === "보호자" ? "#185FA5" : faq.category === "간병인" ? "#0F6E56" : "#5F5E5A",
                    }}>
                      {faq.category}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.4 }}>
                      {faq.question}
                    </span>
                  </div>
                  <span style={{ fontSize: 18, color: "#aaa", flexShrink: 0, transition: "transform 0.2s", transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ⌄
                  </span>
                </button>

                {/* 답변 */}
                {openIndex === i && (
                  <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "0.5px solid #e8e6e0" }}>
                    <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: "1rem 0 0" }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 하단 고객센터 */}
        <div style={{ marginTop: "2rem", background: "#E6F1FB", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#185FA5", marginBottom: 6 }}>원하는 답변을 찾지 못하셨나요?</p>
          <p style={{ fontSize: 13, color: "#378ADD", marginBottom: 16 }}>고객센터로 문의해주시면 빠르게 도와드릴게요.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            <button style={{ padding: "9px 20px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              📞 1866-1004
            </button>
          
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
