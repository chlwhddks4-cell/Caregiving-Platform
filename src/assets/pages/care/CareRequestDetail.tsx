import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from '../context/AuthContext';



interface CareRequest {
  id: number;
  title: string;
  city: string;
  district: string;
  startDate: string;
  endDate: string;
  dailyWage: number;
  careTime: string;
  wageType: string;
  patientAge: number;
  patientGender: string;
  mobility: string;
  diseases: string[];
  description: string;
  status: string;
  createdAt: string;
  applicants: number;
}

export default function CareRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [item, setItem] = useState<CareRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/care-request_detail/${id}`)
      .then((res) => {
        if (res.data.success) {
          setItem(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "4rem", color: "#aaa" }}>로딩 중...</div>;
  }

  if (!item) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#aaa", fontSize: 14 }}>
        요청을 찾을 수 없습니다.
        <br />
        <button onClick={() => navigate(-1)} style={{ marginTop: 16, padding: "8px 16px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
          목록으로
        </button>
      </div>
    );
  }

  const dDay = Math.ceil((new Date(item.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const period = Math.ceil((new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const totalWage = item.dailyWage * period;

 const handleApply = async () => {
  // 로그인 체크
  if (!isLoggedIn) {
    alert("로그인이 필요합니다.");
    navigate("/auth?tab=login");
    return;
  }

  // 역할 체크
  if (user.role !== "caregiver") {
    alert("간병인만 신청할 수 있습니다.");
    return;
  }

  if (!window.confirm("이 간병 요청에 신청하시겠습니까?")) return;

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/care-apply`,
      {
        request_id: item?.id,
        caregiver_id: user?.id,
      }
    );

    if (res.data.success) {
      alert("신청이 완료되었습니다!");
    }
  } catch (err: any) {
    alert(err.response?.data?.message || "신청 실패");
    console.error(err);
  }
};

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* 뒤로가기 */}
        <button
          onClick={() => navigate('/careRequestList')}
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#888", background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0 }}
        >
          ← 목록으로
        </button>

        {/* 헤더 카드 */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: item.status === "대기중" ? "#E1F5EE" : "#FAEEDA", color: item.status === "대기중" ? "#0F6E56" : "#854F0B" }}>
                {item.status}
              </span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#F1EFE8", color: "#5F5E5A" }}>
                {dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day" : "시작됨"}
              </span>
            </div>
            <span style={{ fontSize: 12, color: "#aaa" }}>등록일 {item.createdAt}</span>
          </div>

          <h1 style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", marginBottom: 12, lineHeight: 1.4 }}>{item.title}</h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <span style={{ fontSize: 13, color: "#888" }}>📍 {item.city} {item.district}</span>
            <span style={{ fontSize: 13, color: "#888" }}>👥 신청자 {item.applicants}명</span>
          </div>
        </div>

        {/* 간병 정보 */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <SectionTitle>간병 정보</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            <InfoItem label="시작일" value={item.startDate} />
            <InfoItem label="종료일" value={item.endDate} />
            <InfoItem label="간병 기간" value={`${period}일`} />
            <InfoItem label="간병 시간" value={item.careTime} />
          </div>
        </div>

        {/* 급여 정보 */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <SectionTitle>급여 정보</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            <InfoItem label="일당" value={`${item.dailyWage.toLocaleString()}원`} highlight />
            <InfoItem label="급여 방식" value={item.wageType} />
            <InfoItem label="총 예상 급여" value={`${totalWage.toLocaleString()}원`} highlight />
          </div>
        </div>

        {/* 환자 정보 */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <SectionTitle>환자 정보</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 16 }}>
            <InfoItem label="나이" value={`${item.patientAge}세`} />
            <InfoItem label="성별" value={item.patientGender} />
            <InfoItem label="거동 상태" value={item.mobility} />
          </div>
          <div>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>질환 / 특이사항</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.diseases.map((d) => (
                <span key={d} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#FCEBEB", color: "#A32D2D" }}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 상세 내용 */}
        {item.description && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
            <SectionTitle>상세 내용</SectionTitle>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, margin: 0 }}>{item.description}</p>
          </div>
        )}

            {/* 신청자 목록 버튼 - 보호자만 보임 */}
          {user?.role === 'guardian' && (
            <button
              onClick={() => navigate(`/careApplicants/${item?.id}`)}
              style={{ 
                width: "100%", padding: "12px", fontSize: 14, 
                fontWeight: 500, background: "#fff", 
                color: "#1D9E75", border: "1px solid #1D9E75", 
                borderRadius: 8, cursor: "pointer", marginBottom: 8 
              }}
            >
              👥 신청자 목록 보기 ({item?.applicants}명)
            </button>
          )}
        {/* 신청하기 버튼 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, marginTop: 8 }}>

        
          <button
            onClick={() => navigate("/careRequestList")}
            style={{ padding: "12px", fontSize: 14, background: "#fff", color: "#888", border: "0.5px solid #d0cec8", borderRadius: 8, cursor: "pointer" }}
          >
            목록으로
          </button>
          <button
            onClick={handleApply}
            style={{ padding: "12px", fontSize: 14, fontWeight: 500, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            신청하기
          </button>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 16, paddingBottom: 10, borderBottom: "0.5px solid #e8e6e0" }}>
      {children}
    </p>
  );
}

function InfoItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: highlight ? 16 : 14, fontWeight: highlight ? 500 : 400, color: highlight ? "#1D9E75" : "#1a1a1a", margin: 0 }}>{value}</p>
    </div>
  );
}
