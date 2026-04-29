import { useNavigate } from "react-router-dom";

const REASONS = [
  {
    icon: "✓",
    title: "검증된 간병인",
    desc: "자격증 인증 및 경력 검증을 통해 신뢰할 수 있는 간병인을 매칭해드립니다.",
    bg: "#E6F1FB", color: "#0C447C",
  },
  {
    icon: "⚡",
    title: "빠른 매칭",
    desc: "요청 등록 후 빠른 시간 내에 간병인 신청을 받아 매칭을 완료할 수 있습니다.",
    bg: "#E6F1FB", color: "#0C447C",
  },
  {
    icon: "🔒",
    title: "안전한 서비스",
    desc: "개인정보 암호화 및 안전한 매칭 시스템으로 믿을 수 있는 서비스를 제공합니다.",
    bg: "#E6F1FB", color: "#0C447C",
  },
];

const STEPS = [
  { step: 1, title: "회원가입", desc: "보호자 또는 간병인" },
  { step: 2, title: "간병 요청", desc: "지역·기간·조건 입력" },
  { step: 3, title: "매칭", desc: "신청자 확인 후 수락" },
  { step: 4, title: "간병 시작", desc: "일지 작성 및 관리" },
];

const TEAM = [
  { name: "김대표", role: "대표이사", desc: "간병 서비스 10년 경력" },
  { name: "이개발", role: "CTO", desc: "헬스케어 IT 전문가" },
  { name: "박서비스", role: "서비스팀장", desc: "간병 매칭 전문가" },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "sans-serif" }}>

      {/* 히어로 */}
      <div style={{ background: "#E6F1FB", padding: "4rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "#B5D4F4", color: "#0C447C", marginBottom: 16 }}>
            케어매치 소개
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: "#042C53", lineHeight: 1.5, margin: "0 0 14px" }}>
            믿을 수 있는 간병인 매칭 플랫폼<br />
            <span style={{ color: "#185FA5" }}>케어매치</span>
          </h1>
          <p style={{ fontSize: 14, color: "#185FA5", lineHeight: 1.7, marginBottom: 28 }}>
            케어매치는 보호자와 간병인을 안전하고 빠르게 연결하는<br />
            간병인 매칭 전문 플랫폼입니다.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/careRequestList")}
              style={{ padding: "11px 28px", background: "#185FA5", color: "#E6F1FB", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              서비스 시작하기 →
            </button>
            <button
              onClick={() => navigate("/guide")}
              style={{ padding: "11px 28px", background: "#fff", color: "#185FA5", border: "1px solid #185FA5", borderRadius: 8, fontSize: 14, cursor: "pointer" }}
            >
              이용가이드 보기
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>

        {/* 통계 */}
        <div style={{ background: "#185FA5", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 16, textAlign: "center" }}>
            {[
              { value: "4,782", label: "누적 방문자" },
              { value: "243", label: "간병인 회원" },
              { value: "186", label: "매칭 완료" },
              { value: "4.9", label: "평균 평점" },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: 24, fontWeight: 500, color: "#E6F1FB", margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: "#85B7EB", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 케어매치를 선택해야 하는 이유 */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "#1a1a1a", textAlign: "center", marginBottom: "1.5rem" }}>케어매치를 선택해야 하는 이유</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {REASONS.map((r) => (
              <div key={r.title} style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22, color: r.color }}>
                  {r.icon}
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>{r.title}</p>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 이용 절차 */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "#1a1a1a", textAlign: "center", marginBottom: "1.5rem" }}>서비스 이용 절차</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
            {STEPS.map((s) => (
              <div key={s.step} style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#185FA5", color: "#E6F1FB", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  {s.step}
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 12, color: "#888" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 팀 소개 */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "#1a1a1a", textAlign: "center", marginBottom: "1.5rem" }}>팀 소개</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {TEAM.map((t) => (
              <div key={t.name} style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E6F1FB", color: "#185FA5", fontSize: 20, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  {t.name[0]}
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "#185FA5", marginBottom: 6 }}>{t.role}</p>
                <p style={{ fontSize: 12, color: "#888" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 보호자 / 간병인 CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: "2rem" }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem" }}>
            <span style={{ display: "inline-block", fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#E6F1FB", color: "#185FA5", marginBottom: 12 }}>보호자</span>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>간병인이 필요하신가요?</p>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>지역, 기간, 조건을 입력하면 검증된 간병인을 빠르게 매칭해드립니다.</p>
            <button
              onClick={() => navigate("/careRequest")}
              style={{ width: "100%", padding: "10px", background: "#185FA5", color: "#E6F1FB", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
            >
              간병 요청하기
            </button>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem" }}>
            <span style={{ display: "inline-block", fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#E1F5EE", color: "#0F6E56", marginBottom: 12 }}>간병인</span>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>일감을 찾고 계신가요?</p>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>프로필을 등록하고 원하는 지역의 간병 요청에 신청해보세요.</p>
            <button
              onClick={() => navigate("/careRequestList")}
              style={{ width: "100%", padding: "10px", background: "#0F6E56", color: "#E1F5EE", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
            >
              일감 찾기
            </button>
          </div>
        </div>

        {/* 고객센터 */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>365 고객지원센터</p>
            <p style={{ fontSize: 22, fontWeight: 500, color: "#185FA5" }}>1866-1004</p>
            <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>월~금 09:00~22:00 · 토·일·공휴일 09:00~18:00</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/faq")} style={{ padding: "8px 16px", background: "#E6F1FB", color: "#185FA5", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>자주하는 질문</button>
            <button onClick={() => navigate("/guide")} style={{ padding: "8px 16px", background: "#E6F1FB", color: "#185FA5", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>이용가이드</button>
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
