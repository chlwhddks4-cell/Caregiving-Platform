import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

import { useState ,useEffect} from "react";

import { useNavigate } from "react-router-dom";




ModuleRegistry.registerModules([AllCommunityModule]);

import type { ColDef } from "ag-grid-community";


export default function NoticeGrid() {

  const columnDefs: ColDef[] = [
  {
      headerName: "게시물 번호",
      field: "id",
      width: 120,
      // cellStyle: { paddingLeft: "40px" }
      cellStyle: { textAlign: "center" }
}

,  {
    headerName: "제목",
    field: "title",
    flex: 1,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

     cellRenderer: (params: any) => (
      <span
        className="text-black hover:underline cursor-pointer truncate block"
        onClick={() => navigate(`/detail/${params.data.id}`)}
      >
        {params.value}
      </span>
    ),
    headerClass: "ag-center-header",
  },

  { headerName: "작성자", field: "writer", width: 120
       

   },
  { headerName: "작성일", field: "created_at", width: 140
    
    
  },
  { headerName: "조회수", field: "views", width: 100
    
    
   },
];

   const navigate = useNavigate();
   const [rowData, setRowData] = useState([]);
   const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");
const [searchType, setSearchType] = useState("title"); // title | writer

    const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);

    // 보정 (항상 3개 유지)
    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  
    useEffect(() => {
       
    fetch(`http://13.124.223.105:4000/selectPaging?page=${page}&type=${searchType}&keyword=${keyword}`)  // 🔥 서버 주소
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터:", data);
        setRowData(data.data); // 🔥 핵심
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const fetchData = () => {
  
    fetch(`http://13.124.223.105:4000/selectPaging?page=${page}&type=${searchType}&keyword=${keyword}`)  // 🔥 서버 주소
      .then((res) => res.json())
    .then((data) => {
      setRowData(data.data);
      setTotalPages(data.totalPages);
      
    });
};

const handleSearch = () => {
  fetchData(); // 🔥 직접 호출
};

  return (

     <div className="bg-[#f5f6f8] min-h-screen">

      {/* 상단 */}
      <div className="max-w-[1200px] mx-auto pt-12 pb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">프라임케어 최근 소식</h1>
        <p className="text-sm text-gray-500">공지사항 게시판입니다.</p>
      </div>

      {/* 탭 */}
      <div className="max-w-[1200px] mx-auto border-b">
        <div className="flex text-sm">
          <button className="w-1/3 py-3 bg-[#3f5d8c] text-white">
            공지사항
          </button>
          <button className="w-1/3 py-3 text-gray-500">
            이벤트
          </button>
          <button className="w-1/3 py-3 text-gray-500">
            자료실
          </button>
        </div>
      </div>

      {/* 검색 */}
    <div className="max-w-[1200px] mx-auto mt-6 flex gap-2">

          {/* ✅ 콤보박스 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border px-3 py-2"
          >
            <option value="title">제목</option>
            <option value="writer">작성자</option>
          </select>

          {/* ✅ 검색 input */}
          <input
            type="text"
            value={keyword}
            
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="검색어를 입력하세요"
            className="border px-3 py-2 w-full"
          />

          {/* ✅ 검색 버튼 */}
          <button
            onClick={handleSearch}
            className="bg-[#3f5d8c] text-white px-6 py-2 rounded whitespace-nowrap
                      hover:bg-[#324b73] active:scale-95 transition"
          >
            검색
          </button>

      </div>

      {/* 테이블 */}
     <div className="max-w-[1200px] mx-auto mt-6 bg-white rounded border">

     </div>
   <div className="max-w-[1200px] mx-auto px-4 mt-6">
  <div className="ag-theme-alpine w-full h-[500px] md:h-[500px]">
   

    <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}

        headerHeight={40}
        rowHeight={40}

        onRowClicked={(params) => {
        navigate(`/detail/${params.data.id}`);
      }}
     
        suppressRowClickSelection={true}
        suppressCellFocus={true}

        defaultColDef={{
          resizable: false,
          sortable: false,
        }}
      />

     <div className="flex items-center mt-4">

  {/* 가운데 페이징 */}
  <div className="flex justify-center gap-2 flex-1">
    <button
      className="px-3 py-1 border rounded hover:bg-gray-100"
      onClick={() => setPage((p) => p - 1)}
    >
      이전
    </button>

    {getPageNumbers().map((p) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`px-3 py-1 border rounded
          ${page === p ? "bg-blue-500 text-white" : ""}
        `}
      >
        {p}
      </button>
    ))}

    <button
      className="px-3 py-1 border rounded hover:bg-gray-100"
      onClick={() => setPage((p) => p + 1)}
    >
      다음
    </button>
  </div>


  {/* 오른쪽 글등록 */}

  
  <button
    onClick={() => navigate("/write")}
    className="px-4 py-2 bg-blue-600 text-white rounded ml-auto"
  >
    글등록
  </button>

</div>
      
   
     
  </div>
</div>

</div>
  );
}
