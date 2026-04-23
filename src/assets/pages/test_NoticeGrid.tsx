import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import type { ColDef } from "ag-grid-community";

const testData = [
  { id: 1, title: "테스트 공지사항입니다", writer: "관리자", created_at: "2024-01-15", views: 123 },
  { id: 2, title: "두 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-14", views: 98 },
  { id: 3, title: "세 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-13", views: 75 },
  { id: 4, title: "네 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-12", views: 210 },
  { id: 5, title: "다섯 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-11", views: 56 },
  { id: 6, title: "여섯 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-10", views: 88 },
  { id: 7, title: "일곱 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-09", views: 142 },
  { id: 8, title: "여덟 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-08", views: 67 },
  { id: 9, title: "아홉 번째 공지사항입니다", writer: "관리자", created_at: "2024-01-07", views: 33 },
];

const TABS = ["공지사항", "이벤트", "자료실"];

// 데스크탑용 컬럼 정의
const desktopColumnDefs: ColDef[] = [
  {
    headerName: "번호",
    field: "id",
    width: 80,
    headerClass: "ag-center-header",
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "제목",
    field: "title",
    flex: 1,
    headerClass: "ag-center-header",
    cellStyle: { display: "flex", alignItems: "center" },
  },
  {
    headerName: "작성자",
    field: "writer",
    width: 120,
    headerClass: "ag-center-header",
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "작성일",
    field: "created_at",
    width: 140,
    headerClass: "ag-center-header",
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "조회수",
    field: "views",
    width: 100,
    headerClass: "ag-center-header",
    cellStyle: { textAlign: "center" },
  },
];

// 모바일용 컬럼 정의 (제목 + 날짜만)
const mobileColumnDefs: ColDef[] = [
  {
    headerName: "번호",
    field: "id",
    width: 50,
    headerClass: "ag-center-header",
    cellStyle: { textAlign: "center", fontSize: "12px" },
  },
  {
    headerName: "제목",
    field: "title",
    flex: 1,
    headerClass: "ag-center-header",
    cellStyle: { display: "flex", alignItems: "center", fontSize: "13px" },
  },
  {
    headerName: "작성일",
    field: "created_at",
    width: 100,
    headerClass: "ag-center-header",
    cellStyle: { textAlign: "center", fontSize: "12px" },
  },
];

export default function test_NoticeGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(testData);

  // 화면 너비 감지 (SSR 안전)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const handleSearch = () => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) {
      setFilteredData(testData);
    } else {
      setFilteredData(
        testData.filter(
          (row) =>
            row.title.toLowerCase().includes(keyword) ||
            row.writer.toLowerCase().includes(keyword)
        )
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen">
      {/* 상단 타이틀 */}
      <div className="max-w-[1200px] mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">프라임케어 최근 소식</h1>
        <p className="text-sm text-gray-500">공지사항 게시판입니다.</p>
      </div>

      {/* 탭 */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex text-sm border-b border-gray-300">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2.5 sm:py-3 font-medium transition-colors
                ${
                  activeTab === i
                    ? "bg-[#3f5d8c] text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 검색 */}
      <div className="max-w-[1200px] mx-auto px-4 mt-5 flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3f5d8c] focus:border-transparent"
          placeholder="검색어를 입력하세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="bg-[#3f5d8c] hover:bg-[#2e4568] text-white px-5 sm:px-6 py-2 rounded text-sm transition-colors whitespace-nowrap"
        >
          검색
        </button>
      </div>

      {/* AG Grid */}
      <div className="max-w-[1200px] mx-auto px-4 mt-5 mb-10">
        <style>{`
          .ag-theme-alpine .ag-header {
            background-color: #3f5d8c;
            color: white;
          }
          .ag-theme-alpine .ag-header-cell-label {
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 13px;
          }
          .ag-theme-alpine .ag-header-cell:hover {
            background-color: #2e4568 !important;
          }
          .ag-theme-alpine .ag-row-even {
            background-color: #ffffff;
          }
          .ag-theme-alpine .ag-row-odd {
            background-color: #f9fafb;
          }
          .ag-theme-alpine .ag-row:hover {
            background-color: #eef2f8 !important;
            cursor: pointer;
          }
          .ag-theme-alpine .ag-cell {
            font-size: 13px;
            color: #374151;
            border-right: none !important;
          }
          .ag-theme-alpine .ag-root-wrapper {
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e5e7eb;
          }
          .ag-theme-alpine .ag-paging-panel {
            justify-content: center;
          }

          /* 모바일 조정 */
          @media (max-width: 639px) {
            .ag-theme-alpine .ag-cell {
              font-size: 12px;
              padding-left: 8px;
              padding-right: 8px;
            }
            .ag-theme-alpine .ag-header-cell-label {
              font-size: 12px;
            }
          }
        `}</style>

        {/* 결과 없을 때 메시지 */}
        {filteredData.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg py-16 text-center text-gray-400 text-sm">
            검색 결과가 없습니다.
          </div>
        ) : (
          <>
            {/* 데스크탑: AG Grid */}
            <div className="hidden sm:block ag-theme-alpine w-full" style={{ height: "500px" }}>
              <AgGridReact
                rowData={filteredData}
                columnDefs={desktopColumnDefs}
                headerHeight={44}
                rowHeight={48}
                suppressRowClickSelection={true}
                suppressCellFocus={true}
                defaultColDef={{
                  resizable: false,
                  sortable: false,
                }}
              />
            </div>

            {/* 모바일: AG Grid (컬럼 축소) */}
            <div className="block sm:hidden ag-theme-alpine w-full" style={{ height: "500px" }}>
              <AgGridReact
                rowData={filteredData}
                columnDefs={mobileColumnDefs}
                headerHeight={40}
                rowHeight={44}
                suppressRowClickSelection={true}
                suppressCellFocus={true}
                defaultColDef={{
                  resizable: false,
                  sortable: false,
                }}
              />
            </div>
          </>
        )}

        {/* 총 게시글 수 */}
        <div className="mt-3 text-xs text-gray-400 text-right">
          총 {filteredData.length}건
        </div>
      </div>
    </div>
  );
}
