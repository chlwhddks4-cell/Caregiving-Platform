import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface MyRequest {
  id: number;
  title: string;
  city: string;
  district: string;
  startDate: string;
  endDate: string;
  dailyWage: number;
  careTime: string;
  status: string;
  createdAt: string;
  applicants: number;
}

export default function MyRequestList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<MyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async (page = 1) => {
  if (!user?.id) return;
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/care-request/my/${user.id}`,
      { params: { page } }
    );
    if (res.data.success) {
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  fetchData(currentPage);
}, [user, currentPage]);



  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem", color: "#aaa" }}>로딩 중...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 14, color: "#888" }}>총 {total }건의 요청이 있습니다.</p>
        <button
          onClick={() => navigate("/careRequest")}
          style={{ padding: "8px 16px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
        >
          + 새 요청 등록
        </button>
      </div>

      {data.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#aaa", fontSize: 14, background: "#f8f7f4", borderRadius: 12 }}>
          등록한 간병 요청이 없습니다.
          <br />
          <button
            onClick={() => navigate("/careRequest")}
            style={{ marginTop: 16, padding: "8px 20px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
          >
            간병 요청 등록하기
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((item) => (
            <RequestCard
              key={item.id}
              item={item}
              onDetail={() => navigate(`/careRequestDetail/${item.id}`)}
              onApplicants={() => navigate(`/careApplicants/${item.id}`)}
            />
          ))}
        </div>
      )}
        {/* 페이징 */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={pageBtn(currentPage === 1)}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={pageBtn(false, page === currentPage)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={pageBtn(currentPage === totalPages)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

function RequestCard({
  item,
  onDetail,
  onApplicants,
}: {
  item: MyRequest;
  onDetail: () => void;
  onApplicants: () => void;
}) {
  const statusStyle: Record<string, { bg: string; color: string }> = {
    대기중: { bg: "#E1F5EE", color: "#0F6E56" },
    매칭중: { bg: "#FAEEDA", color: "#854F0B" },
    매칭완료: { bg: "#3c1ee7", color: "#f7f7ed" },
  };
  const s = statusStyle[item.status] || statusStyle["대기중"];

  return (
    <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem" }}>

      {/* 상단: 상태 + 날짜 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color }}>
          {item.status}
        </span>
        <span style={{ fontSize: 12, color: "#aaa" }}>{item.createdAt}</span>
      </div>

      {/* 제목 */}
      <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.4 }}>{item.title}</p>

      {/* 정보 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#888" }}>📍 {item.city} {item.district}</span>
        <span style={{ fontSize: 12, color: "#888" }}>📅 {item.startDate} ~ {item.endDate}</span>
        <span style={{ fontSize: 12, color: "#888" }}>⏰ {item.careTime}</span>
        <span style={{ fontSize: 12, color: "#888" }}>💰 {Number(item.dailyWage).toLocaleString()}원 / 일</span>
      </div>

      {/* 하단: 신청자 수 + 버튼 */}
      <div style={{ borderTop: "0.5px solid #e8e6e0", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#888" }}>👥 신청자 {item.applicants}명</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onDetail}
            style={{ padding: "6px 14px", fontSize: 12, background: "#fff", color: "#888", border: "0.5px solid #d0cec8", borderRadius: 8, cursor: "pointer" }}
          >
            상세보기
          </button>
          <button
            onClick={onApplicants}
            style={{ padding: "6px 14px", fontSize: 12, background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            신청자 목록
          </button>
        </div>
      </div>
      
    

    </div>
    
  );
}

const pageBtn = (disabled?: boolean, active?: boolean): React.CSSProperties => ({
  padding: "6px 12px",
  fontSize: 13,
  border: "0.5px solid #d0cec8",
  borderRadius: 8,
  cursor: disabled ? "not-allowed" : "pointer",
  background: active ? "#185FA5" : "#fff",
  color: active ? "#fff" : disabled ? "#ccc" : "#888",
});