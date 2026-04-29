import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../context/AuthContext';



const CITIES = ["전체", "서울특별시", "경기도", "부산광역시", "인천광역시", "대구광역시", "대전광역시", "광주광역시", "울산광역시", "세종특별자치시", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];

import axios from 'axios';

const PAGE_SIZE = 6;

interface CareRequest {
  id: number;
  title: string;
  city: string;
  district: string;
  startDate: string;
  endDate: string;
  dailyWage: number;
  careTime: string;
  diseases: string[];
  mobility: string;
  status: string;
  createdAt: string;
}

export default function CareRequestList() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("전체");

  const { user, isLoggedIn } = useAuth();
  

  const [data, setData] = useState<CareRequest[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
const [tempCity, setTempCity] = useState("전체");              // 입력용
const [tempStartDate, setTempStartDate] = useState("");         // 입력용
const [tempEndDate, setTempEndDate] = useState("");             // 입력용

 
// 데이터 조회
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/care-request-list`, {
          params: {
            page: currentPage,
            city: tempCity,
            startDate,
            endDate,
          }
        }
      );
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch_ORG = () => {
  setSelectedCity(tempCity);
  setStartDate(tempStartDate);
  setEndDate(tempEndDate);
  setCurrentPage(1);
};

 const resetFilter = () => {
  setTempCity("전체");
  setTempStartDate("");
  setTempEndDate("");
  setSelectedCity("전체");
  setStartDate("");
  setEndDate("");
  setCurrentPage(1);
};
  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>프라임케어</p>
            <h1 style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>간병 요청 목록</h1>
            <p style={{ fontSize: 13, color: "#888", marginTop: 6 }}>총 {total}건의 요청이 있습니다.</p>
          </div>
          {/* 요청 등록하기 버튼 - 보호자만 */}
          {isLoggedIn  && user?.role === 'guardian' && (
          <button
            onClick={() => navigate("/careRequest")}
            style={{ padding: "10px 20px", background: "#1D9E75", color: "#E1F5EE", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            요청 등록하기
          </button>
          )}
        </div>

        {/* 검색 조건 */}
     <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem", marginBottom: "1.25rem" }}>
  
        {/* 상단: 필터 제목 + 버튼 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>목록</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={resetFilter}
              style={{ padding: "6px 14px", fontSize: 13, background: "#fff", color: "#888", border: "0.5px solid #d0cec8", borderRadius: 8, cursor: "pointer" }}
            >
              초기화
            </button>
            <button
              onClick={() => handleSearch()}
              style={{ padding: "6px 14px", fontSize: 13, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              검색
            </button>
          </div>
        </div>

        {/* 필터 입력 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#888", marginBottom: 6 }}>지역</label>
            <select
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              style={inputStyle}
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>

            
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#888", marginBottom: 6 }}>시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#888", marginBottom: 6 }}>종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 검색 조건 끝*/}

        {/* 목록 */}
        {total === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#aaa", fontSize: 14 }}>
            조건에 맞는 요청이 없습니다.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                    {data.map((item) => (
            <CareCard key={item.id} item={item} onClick={() => navigate(`/careRequestDetail/${item.id}`)} />
          ))}
          </div>
        )}

        {/* 페이징 */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
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

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function CareCard({ item, onClick }: { item: CareRequest; onClick: () => void }) {
  const dDay = Math.ceil((new Date(item.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        border: "0.5px solid #e8e6e0",
        borderRadius: 12,
        padding: "1.25rem",
        cursor: "pointer",
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* 상태 + D-day */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{
          fontSize: 11, padding: "3px 8px", borderRadius: 20,
          background: item.status === "대기중" ? "#E1F5EE" : "#FAEEDA",
          color: item.status === "대기중" ? "#3a4949" : "#854F0B",
        }}>
          {item.status}
        </span>
        <span style={{ fontSize: 11, color: "#aaa" }}>
          {dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day" : "시작됨"}
        </span>
      </div>

      {/* 제목 */}
      <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 8, lineHeight: 1.4 }}>{item.title}</p>

      {/* 지역 */}
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>📍 {item.city} {item.district}</p>

      {/* 기간 */}
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>📅 {item.startDate} ~ {item.endDate}</p>

      {/* 간병 시간 */}
      <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>⏰ {item.careTime}</p>

      {/* 질환 태그 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {item.diseases.map((d) => (
          <span key={d} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#F1EFE8", color: "#5F5E5A" }}>{d}</span>
        ))}
      </div>

      {/* 하단 */}
      <div style={{ borderTop: "0.5px solid #e8e6e0", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#1D9E75" }}>
          {item.dailyWage}원
          <span style={{ fontSize: 11, color: "#aaa", fontWeight: 400 }}> / 일</span>
        </span>
        <span style={{ fontSize: 12, color: "#aaa" }}>{item.createdAt}</span>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 14,
  color: "#1a1a1a",
  background: "#fff",
  border: "0.5px solid #d0cec8",
  borderRadius: 8,
  padding: "8px 12px",
  outline: "none",
};

const pageBtn = (disabled?: boolean, active?: boolean): React.CSSProperties => ({
  padding: "6px 12px",
  fontSize: 13,
  border: "0.5px solid #d0cec8",
  borderRadius: 8,
  cursor: disabled ? "not-allowed" : "pointer",
  background: active ? "#1D9E75" : "#fff",
  color: active ? "#fff" : disabled ? "#ccc" : "#888",
});
