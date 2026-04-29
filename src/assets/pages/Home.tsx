import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: "4,782", label: "누적 방문자" },
  { value: "243", label: "간병인 회원" },
  { value: "186", label: "매칭 완료" },
  { value: "4.9", label: "평균 평점" },
];

const STEPS = [
  { step: "1", title: "회원가입", desc: "보호자 또는 간병인" },
  { step: "2", title: "간병 요청", desc: "지역·기간·조건 입력" },
  { step: "3", title: "간병인 매칭", desc: "신청자 확인 후 수락" },
  { step: "4", title: "간병 시작", desc: "일지 작성 및 관리" },
];

const JOBS = [
  { name: "오**", age: 69, gender: "여", area: "고양시", date: "26-04-16" },
  { name: "김**", age: 62, gender: "여", area: "김해시", date: "26-04-13" },
  { name: "정**", age: 62, gender: "여", area: "노원구", date: "26-04-08" },
  { name: "박**", age: 84, gender: "여", area: "종로구", date: "26-04-08" },
];

const NEWS = [
  { tag: "이벤트", tagStyle: { background: "#B5D4F4", color: "#0C447C" }, title: "홈페이지 개설 이벤트 - 회원가입 추천인 이벤트", date: "01-20" },
  { tag: "공지", tagStyle: { background: "#E6F1FB", color: "#185FA5" }, title: "간병보험 관련 유의사항 안내", date: "01-19" },
  { tag: "공지", tagStyle: { background: "#E6F1FB", color: "#185FA5" }, title: "동행 매니저 자격증 강의 서비스 오픈", date: "01-19" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "3rem 1rem 2.5rem", marginBottom: "1.5rem" }}>
          <span style={{ display: "inline-block", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "#E6F1FB", color: "#185FA5", marginBottom: 14 }}>
            프라임케어 간병 플랫폼
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.5, margin: "10px 0 14px" }}>
            필요할 때 바로 연결되는<br />
            <span style={{ color: "#185FA5" }}>간병인 매칭 서비스</span>
          </h1>
          <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 24 }}>
            검증된 간병인과 빠르게 연결하고<br />간병보험 청구까지 한번에 해결하세요.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/careRequestList")}
              style={{ padding: "11px 28px", background: "#185FA5", color: "#E6F1FB", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              간병 요청 목록 →
            </button>
            <button
              onClick={() => navigate("/careRequest")}
              style={{ padding: "11px 28px", background: "#fff", color: "#185FA5", border: "1px solid #185FA5", borderRadius: 8, fontSize: 14, cursor: "pointer" }}
            >
              간병 요청하기
            </button>
          </div>
        </div>

        {/* 통계 바 */}
        <div style={{ background: "#185FA5", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 16, textAlign: "center" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: 22, fontWeight: 500, color: "#E6F1FB", margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: "#85B7EB", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 이용 절차 */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: "1rem" }}>이용 절차</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
            {STEPS.map((s) => (
              <div key={s.step} style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E6F1FB", color: "#185FA5", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  {s.step}
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 11, color: "#888" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 실시간 일감 + 공지사항 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: "1.5rem" }}>

          {/* 실시간 일감 */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>실시간 일감</p>
              <span style={{ fontSize: 12, color: "#185FA5", cursor: "pointer" }} onClick={() => navigate("/careRequestList")}>더보기 →</span>
            </div>
            <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {JOBS.map((j, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: i < JOBS.length - 1 ? 12 : 0, borderBottom: i < JOBS.length - 1 ? "0.5px solid #e8e6e0" : "none" }}
                  >
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{j.name} · {j.age}세 · {j.gender}</p>
                      <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{j.area} · {j.date}</p>
                    </div>
                    <button
                      onClick={() => navigate("/careRequestList")}
                      style={{ padding: "5px 12px", background: "#E6F1FB", color: "#185FA5", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                    >
                      지원
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 공지사항 */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>공지사항</p>
              <span style={{ fontSize: 12, color: "#185FA5", cursor: "pointer" }} onClick={() => navigate("/noticeGrid")}>더보기 →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {NEWS.map((n, i) => (
                <div
                  key={i}
                  onClick={() => navigate("/noticeGrid")}
                  style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1rem", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div>
                      <span style={{ display: "inline-block", fontSize: 11, padding: "3px 10px", borderRadius: 20, marginBottom: 6, ...n.tagStyle }}>{n.tag}</span>
                      <p style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.5 }}>{n.title}</p>
                    </div>
                    <span style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap" }}>{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 고객센터 */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: "1.5rem" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>365 고객지원센터</p>
            <p style={{ fontSize: 22, fontWeight: 500, color: "#185FA5" }}>1866-1004</p>
            <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>월~금 09:00~22:00 · 토·일·공휴일 09:00~18:00</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => navigate("/faq")}
              style={{ padding: "8px 16px", background: "#E6F1FB", color: "#185FA5", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
            >
              자주하는 질문
            </button>
            <button
              onClick={() => alert("카카오 상담은 준비중입니다.")}
              style={{ padding: "8px 16px", background: "#E6F1FB", color: "#185FA5", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
            >
              카카오 상담
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
