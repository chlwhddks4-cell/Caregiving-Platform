import { useNavigate } from "react-router-dom";

export default function ServicePage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "sans-serif" }}>

      {/* 히어로 */}
      <div style={{ background: "#E6F1FB", padding: "4rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "#B5D4F4", color: "#0C447C", marginBottom: 16 }}>
            케어매치 서비스 소개
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: "#042C53", lineHeight: 1.5, margin: "0 0 14px" }}>
            간병인 매칭부터 보험 청구까지<br />
            <span style={{ color: "#185FA5" }}>모든 것을 한번에</span>
          </h1>
          <p style={{ fontSize: 14, color: "#378ADD", lineHeight: 1.7 }}>
            케어매치는 보호자와 간병인을 안전하고 빠르게 연결하는<br />
            전문 간병인 매칭 플랫폼입니다.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1rem" }}>

        {/* 섹션 1: 이미지 왼쪽 */}
        <Section
          reverse={false}
          imgBg="#E6F1FB"
          imgContent={
            <div style={{ textAlign: "center", padding: "2rem", width: "100%" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 13, color: "#185FA5", fontWeight: 500 }}>간병인 검색 화면</div>
              <div style={{ marginTop: 12, background: "#fff", borderRadius: 8, padding: "10px 14px", textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>📍 서울특별시 강남구</div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>📅 2026-05-01 ~ 2026-05-31</div>
                <div style={{ fontSize: 11, color: "#185FA5", fontWeight: 500 }}>간병인 12명 신청</div>
              </div>
            </div>
          }
          badge="01. 간병인 매칭"
          badgeBg="#E6F1FB"
          badgeColor="#185FA5"
          title={"원하는 조건의 간병인을\n빠르게 찾아보세요"}
          desc="지역, 기간, 일당 등 원하는 조건을 입력하면 조건에 맞는 간병인들이 신청해드립니다."
          features={[
            { title: "지역별 검색", desc: "전국 시도/구군 단위로 원하는 지역의 간병인을 찾을 수 있어요.", bg: "#E6F1FB" },
            { title: "조건 맞춤 매칭", desc: "기간, 일당, 간병 시간 등 세부 조건을 설정할 수 있어요.", bg: "#E6F1FB" },
            { title: "신청자 프로필 확인", desc: "경력, 자격증, 자기소개를 확인하고 수락/거절할 수 있어요.", bg: "#E6F1FB" },
          ]}
        />

        <div style={{ height: 60 }} />

        {/* 섹션 2: 이미지 오른쪽 */}
        <Section
          reverse={true}
          imgBg="#E1F5EE"
          imgContent={
            <div style={{ textAlign: "center", padding: "2rem", width: "100%" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🧑‍⚕️</div>
              <div style={{ fontSize: 13, color: "#0F6E56", fontWeight: 500 }}>간병인 프로필</div>
              <div style={{ marginTop: 12, background: "#fff", borderRadius: 8, padding: "10px 14px", textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>경력 5년 · 요양보호사 1급</div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>활동지역: 서울 강남구</div>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {["치매", "뇌졸중", "24시간"].map((t) => (
                    <span key={t} style={{ fontSize: 10, padding: "2px 6px", background: "#E1F5EE", color: "#0F6E56", borderRadius: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          }
          badge="02. 검증된 간병인"
          badgeBg="#E1F5EE"
          badgeColor="#0F6E56"
          title={"자격증 인증된 전문\n간병인을 만나보세요"}
          desc="케어매치의 간병인은 자격증 및 경력 검증 절차를 거쳐 신뢰할 수 있는 서비스를 제공합니다."
          features={[
            { title: "자격증 인증", desc: "요양보호사, 간호조무사 등 자격증 보유 여부를 확인해요.", bg: "#E1F5EE" },
            { title: "경력 검증", desc: "실제 간병 경력을 확인하고 신뢰할 수 있는 간병인을 선택해요.", bg: "#E1F5EE" },
            { title: "리뷰 및 평점", desc: "이전 보호자들의 리뷰와 평점으로 간병인을 평가할 수 있어요.", bg: "#E1F5EE" },
          ]}
        />

        <div style={{ height: 60 }} />

        {/* CTA */}
        <div style={{ background: "#E6F1FB", borderRadius: 16, padding: "2.5rem", textAlign: "center" }}>
          <p style={{ fontSize: 20, fontWeight: 500, color: "#185FA5", marginBottom: 8 }}>지금 바로 케어매치를 시작해보세요</p>
          <p style={{ fontSize: 14, color: "#378ADD", marginBottom: 24 }}>믿을 수 있는 간병 서비스를 경험하세요.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/careRequestList")}
              style={{ padding: "11px 28px", background: "#185FA5", color: "#E6F1FB", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              간병인 찾기 →
            </button>
            <button
              onClick={() => navigate("/careRequest")}
              style={{ padding: "11px 28px", background: "#fff", color: "#185FA5", border: "1px solid #185FA5", borderRadius: 8, fontSize: 14, cursor: "pointer" }}
            >
              간병 요청하기
            </button>
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function Section({
  reverse, imgBg, imgContent, badge, badgeBg, badgeColor, title, desc, features,
}: {
  reverse: boolean;
  imgBg: string;
  imgContent: React.ReactNode;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  title: string;
  desc: string;
  features: { title: string; desc: string; bg: string }[];
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      flexWrap: "wrap",
      flexDirection: reverse ? "row-reverse" : "row",
    }}>
      {/* 이미지 박스 */}
      <div style={{
        flex: 1, minWidth: 220,
        background: imgBg,
        borderRadius: 16,
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {imgContent}
      </div>

      {/* 텍스트 박스 */}
      <div style={{ flex: 1, minWidth: 220 }}>
        <span style={{ display: "inline-block", fontSize: 11, padding: "3px 12px", borderRadius: 20, background: badgeBg, color: badgeColor, marginBottom: 12 }}>
          {badge}
        </span>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.5, whiteSpace: "pre-line" }}>
          {title}
        </h2>
        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 20 }}>{desc}</p>
        {features.map((f) => (
          <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 2 }}>
              ✓
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>{f.title}</p>
              <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
