import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Applicant {
  id: number;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  career_years: number;
  certificates: string;
  city: string;
  district: string;
  intro: string;
  status: string;
  created_at: string;
}

export default function CareApplicantList() {
  const { request_id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/care-apply/${request_id}`
      );
      if (res.data.success) {
        setApplicants(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [request_id]);

  const handleAccept = async (applyId: number, name: string) => {
  if (!window.confirm(`${name}님의 신청을 수락하시겠습니까?`)) return;

  
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/care-apply/${applyId}/accept`,
          { request_id: request_id 
           } // 추가!
        );
        if (res.data.success) {
          alert("수락되었습니다!");
          fetchApplicants();
        }
      } catch (err: any) {
        alert(err.response?.data?.message || "수락 실패");
      }
 };

  const handleReject = async (applyId: number, name: string) => {
    if (!window.confirm(`${name}님의 신청을 거절하시겠습니까?`)) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/care-apply/${applyId}/reject`
      );
      if (res.data.success) {
        alert("거절되었습니다.");
        fetchApplicants();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "거절 실패");
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "4rem", color: "#aaa" }}>로딩 중...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#888", background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0 }}
        >
          ← 요청 상세로
        </button>

        {/* 헤더 */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>프라임케어</p>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>신청자 목록</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 6 }}>총 {applicants.length}명이 신청했습니다.</p>
        </div>

        {/* 신청자 없음 */}
        {applicants.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#aaa", fontSize: 14, background: "#fff", borderRadius: 12, border: "0.5px solid #e8e6e0" }}>
            아직 신청자가 없습니다.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onAccept={() => handleAccept(applicant.id, applicant.name)}
                onReject={() => handleReject(applicant.id, applicant.name)}
              />
            ))}
          </div>
        )}

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function ApplicantCard({
  applicant,
  onAccept,
  onReject,
}: {
  applicant: Applicant;
  onAccept: () => void;
  onReject: () => void;
}) {
  const statusColor = {
    대기중: { bg: "#F1EFE8", color: "#5F5E5A" },
    수락: { bg: "#E1F5EE", color: "#0F6E56" },
    거절: { bg: "#FCEBEB", color: "#A32D2D" },
  }[applicant.status] || { bg: "#F1EFE8", color: "#5F5E5A" };

  return (
     <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem" }}>
      
      {/* 상단: 프로필 + 상태 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          👤
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{applicant.name}</p>
          <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{applicant.phone}</p>
        </div>
        <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: statusColor.bg, color: statusColor.color }}>
          {applicant.status}
        </span>
      </div>

      {/* 정보 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 12, color: "#aaa", margin: 0, marginBottom: 2 }}>경력</p>
          <p style={{ fontSize: 13, color: "#1a1a1a", margin: 0 }}>{applicant.career_years ? `${applicant.career_years}년` : '미입력'}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#aaa", margin: 0, marginBottom: 2 }}>자격증</p>
          <p style={{ fontSize: 13, color: "#1a1a1a", margin: 0 }}>{applicant.certificates || '미입력'}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#aaa", margin: 0, marginBottom: 2 }}>활동 지역</p>
          <p style={{ fontSize: 13, color: "#1a1a1a", margin: 0 }}>
            {applicant.city && applicant.district ? `${applicant.city} ${applicant.district}` : '미입력'}
          </p>
        </div>
      </div>

      {/* 자기소개 - 왼쪽 정렬 */}
          {applicant.intro && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0, marginBottom: 4 }}>자기소개</p>
              <p style={{ fontSize: 13, color: "#444", margin: 0, lineHeight: 1.6 }}>
                {applicant.intro.length > 80 ? applicant.intro.slice(0, 80) + '...' : applicant.intro}
              </p>
            </div>
          )}

      {/* 하단: 신청일 + 버튼 */}
      <div style={{ borderTop: "0.5px solid #e8e6e0", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
          신청일 {new Date(applicant.created_at).toLocaleDateString()}
        </p>

        {/* 대기중일 때만 버튼 표시 */}
        {applicant.status === '대기중' ? (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onReject}
              style={{ padding: "7px 16px", fontSize: 13, background: "#fff", color: "#A32D2D", border: "0.5px solid #A32D2D", borderRadius: 8, cursor: "pointer" }}
            >
              거절
            </button>
            <button
              onClick={onAccept}
              style={{ padding: "7px 16px", fontSize: 13, fontWeight: 500, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              수락
            </button>
          </div>
        ) : (
          <span style={{ fontSize: 13, color: applicant.status === '수락' ? "#0F6E56" : "#A32D2D" }}>
            {applicant.status === '수락' ? '✅ 수락 완료' : '❌ 거절 완료'}
          </span>
        )}
      </div>
    </div>
  );
}
