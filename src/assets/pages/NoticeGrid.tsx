import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../pages/context/AuthContext.tsx';

interface BoardItem {
  id: number;
  title: string;
  writer: string;
  created_at: string;
  views: number;
}

export default function NoticeGrid() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState(location.state?.tab || '공지사항');
  const [rowData, setRowData] = useState<BoardItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("title");

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);
    if (end - start < 2) start = Math.max(1, end - 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/selectPaging?page=${page}&type=${searchType}&keyword=${keyword}&tab=${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setRowData(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
      setPage(1);
    }
  }, [location.state]);

  useEffect(() => {
    fetchData();
  }, [page, activeTab]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "#185FA5", marginBottom: 6 }}>CareMatch 최근 소식</h1>
          <p style={{ fontSize: 13, color: "#888" }}>공지사항 및 자료실입니다.</p>
        </div>

        {/* 탭 */}
        <div style={{ display: "flex", borderBottom: "0.5px solid #e8e6e0", marginBottom: "1.25rem" }}>
          {["공지사항", "자료실"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPage(1); }}
              style={{
                flex: 1, padding: "12px", fontSize: 14, fontWeight: 500,
                background: activeTab === tab ? "#185FA5" : "#fff",
                color: activeTab === tab ? "#fff" : "#888",
                border: "none", cursor: "pointer",
                borderBottom: activeTab === tab ? "2px solid #185FA5" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{ padding: "9px 12px", fontSize: 13, border: "0.5px solid #d0cec8", borderRadius: 8, background: "#fff", color: "#1a1a1a", outline: "none" }}
          >
            <option value="title">제목</option>
            <option value="writer">작성자</option>
          </select>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            placeholder="검색어를 입력하세요"
            style={{ flex: 1, minWidth: 150, padding: "9px 12px", fontSize: 13, border: "0.5px solid #d0cec8", borderRadius: 8, outline: "none" }}
          />
          <button
            onClick={handleSearch}
            style={{ padding: "9px 20px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            검색
          </button>
        </div>

        {/* 테이블 - PC */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, overflow: "hidden", marginBottom: "1rem" }}>

          {/* 헤더 */}
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px 120px 80px", padding: "10px 16px", background: "#f8f7f4", borderBottom: "0.5px solid #e8e6e0" }}
            className="hidden-mobile">
            {["번호", "제목", "작성자", "작성일", "조회수"].map((h) => (
              <span key={h} style={{ fontSize: 12, color: "#888", fontWeight: 500, textAlign: "center" }}>{h}</span>
            ))}
          </div>

          {/* 목록 */}
          {rowData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#aaa", fontSize: 14 }}>
              게시물이 없습니다.
            </div>
          ) : (
            rowData.map((item, i) => (
              <div
                key={item.id}
                onClick={() => navigate(`/detail/${item.id}`, { state: { tab: activeTab } })}
                style={{
                  borderBottom: i < rowData.length - 1 ? "0.5px solid #e8e6e0" : "none",
                  cursor: "pointer", padding: "12px 16px",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f7f4")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                {/* PC 레이아웃 */}
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px 120px 80px", alignItems: "center" }}
                  className="hidden-mobile">
                  <span style={{ fontSize: 13, color: "#aaa", textAlign: "center" }}>{item.id}</span>
                  <span style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center" }}>{item.title}</span>
                  <span style={{ fontSize: 12, color: "#888", textAlign: "center" }}>{item.writer}</span>
                  <span style={{ fontSize: 12, color: "#888", textAlign: "center" }}>{item.created_at}</span>
                  <span style={{ fontSize: 12, color: "#888", textAlign: "center" }}>{item.views}</span>
                </div>

                {/* 모바일 레이아웃 */}
                <div className="show-mobile">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", flex: 1, marginRight: 8 }}>{item.title}</span>
                    <span style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap" }}>{item.created_at}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "#888" }}>✍️ {item.writer}</span>
                    <span style={{ fontSize: 11, color: "#888" }}>👁 {item.views}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이징 + 글등록 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, position: "relative" }}>

          {/* 페이징 */}
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            style={{ padding: "6px 12px", fontSize: 13, border: "0.5px solid #d0cec8", borderRadius: 8, cursor: page === 1 ? "not-allowed" : "pointer", background: "#fff", color: page === 1 ? "#ccc" : "#888" }}
          >
            이전
          </button>

          {getPageNumbers().map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{ padding: "6px 12px", fontSize: 13, border: "0.5px solid #d0cec8", borderRadius: 8, cursor: "pointer", background: page === p ? "#185FA5" : "#fff", color: page === p ? "#fff" : "#888" }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            style={{ padding: "6px 12px", fontSize: 13, border: "0.5px solid #d0cec8", borderRadius: 8, cursor: page === totalPages ? "not-allowed" : "pointer", background: "#fff", color: page === totalPages ? "#ccc" : "#888" }}
          >
            다음
          </button>

          {/* 글등록 - 관리자만 */}
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate("/write", { state: { tab: activeTab } })}
              style={{ position: "absolute", right: 0, padding: "7px 16px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
            >
              글등록
            </button>
          )}
        </div>

        <div style={{ height: 40 }} />
      </div>

      <style>{`
        .hidden-mobile { display: grid; }
        .show-mobile { display: none; }
        @media (max-width: 600px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}