import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface MyApply {
  id: number;
  applyStatus: string;
  applyDate: string;
  requestId: number;
  title: string;
  city: string;
  district: string;
  startDate: string;
  endDate: string;
  dailyWage: number;
  careTime: string;
  requestStatus: string;
}

export default function MyApplyList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<MyApply[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async (page = 1) => {
    if (!user?.id) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/care-apply/my/${user.id}`,
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
        <p style={{ fontSize: 14, color: "#888" }}>총 {total}건의 신청이 있습니다.</p>
        <button
          onClick={() => navigate("/careRequestList")}
          style={{ padding: "8px 16px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
        >
          일감 찾기 →
        </button>
      </div>

      {data.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#aaa", fontSize: 14, background: "#f8f7f4", borderRadius: 12 }}>
          신청한 간병 요청이 없습니다.
          <br />
          <button
            onClick={() => navigate("/careRequestList")}
            style={{ marginTop: 16, padding: "8px 20px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
          >
            일감 찾으러 가기
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((item) => (
            <ApplyCard
              key={item.id}
              item={item}
              onDetail={() => navigate(`/careRequestDetail/${item.requestId}`)}
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

function ApplyCard({
  item,
  onDetail,
}: {
  item: MyApply;
  onDetail: () => void;
}) {
  const applyStatusStyle: Record<string, { bg: string; color: string }> = {
    대기중: { bg: "#F1EFE8", color: "#5F5E5A" },
    수락: { bg: "#E1F5EE", color: "#0F6E56" },
    거절: { bg: "#FCEBEB", color: "#A32D2D" },
  };

  const s = applyStatusStyle[item.applyStatus] || applyStatusStyle["대기중"];

  return (
    <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem" }}>

      {/* 상단: 신청 상태 + 신청일 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color }}>
          {item.applyStatus}
        </span>
        <span style={{ fontSize: 12, color: "#aaa" }}>신청일 {item.applyDate}</span>
      </div>

      {/* 제목 */}
      <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.4 }}>
        {item.title}
      </p>

      {/* 정보 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#888" }}>📍 {item.city} {item.district}</span>
        <span style={{ fontSize: 12, color: "#888" }}>📅 {item.startDate} ~ {item.endDate}</span>
        <span style={{ fontSize: 12, color: "#888" }}>⏰ {item.careTime}</span>
        <span style={{ fontSize: 12, color: "#888" }}>💰 {Number(item.dailyWage).toLocaleString()}원 / 일</span>
      </div>

      {/* 하단: 요청 상태 + 버튼 */}
      <div style={{ borderTop: "0.5px solid #e8e6e0", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#888" }}>
          요청 상태:
          <span style={{ marginLeft: 4, color: item.requestStatus === '매칭중' ? "#854F0B" : "#1a1a1a" }}>
            {item.requestStatus}
          </span>
        </span>
        <button
          onClick={onDetail}
          style={{ padding: "6px 14px", fontSize: 12, background: "#fff", color: "#888", border: "0.5px solid #d0cec8", borderRadius: 8, cursor: "pointer" }}
        >
          상세보기
        </button>
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
