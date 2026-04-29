
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function div_NoticePage() {

// const [data, setData] = useState<Post[]>([]);
   
   const [data, setData] = useState<any[]>([]);
   const navigate = useNavigate();
   const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 서버 데이터 가져오기
 const handleSearch = () => {
  setPage(1); // 🔥 이걸로 useEffect 실행
};

  useEffect(() => {
    fetch(`http://localhost:4000/selectPaging?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
          setData(res.data)
          setTotalPages(res.totalPages);
      }
    )
      .catch((err) => console.error(err));
  }, [page]);

  

  

  const regClick = () => {
         
          navigate("/write")
  }

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
        <input
          className="flex-1 border rounded px-4 py-2 bg-white"
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearch}
        className="bg-[#3f5d8c] text-white px-6 rounded">
          검색
        </button>
      </div>

      {/* 테이블 */}
     <div className="max-w-[1200px] mx-auto mt-6 bg-white rounded border">

  {/* 헤더 */}
  <div className="grid grid-cols-12 text-sm text-gray-500 border-b py-3 text-center font-semibold">
    <div className="col-span-1">번호</div>
    <div className="col-span-5 text-center pl-2">제목</div>
    <div className="col-span-2">작성자</div>
    <div className="col-span-2">작성일</div>
    <div className="col-span-2">조회수</div>
  </div>

  {/* 리스트 */}
  {data.map((item) => (
    <div
      key={item.id}
      className="grid grid-cols-12 text-sm py-3 border-b items-center hover:bg-gray-50"
    >
      <div className="col-span-1 text-gray-500 text-center">
        {item.id}
      </div>

      <div
        className="col-span-5 text-left pl-2 cursor-pointer hover:underline hover:text-blue-600 truncate transition"
        onClick={() => navigate(`/detail/${item.id}`)}
      >
        {item.title}
      </div>

      <div className="col-span-2 text-gray-500 text-center">
        {item.writer}
      </div>

      <div className="col-span-2 text-gray-500 text-center">
        {item.created_at}
      </div>

      <div className="col-span-2 text-gray-500 text-center">
        {item.views}
      </div>
    </div>
  ))}

</div>

      {/* 페이지네이션 */}
     <div className="max-w-[1200px] mx-auto mt-6 relative">

        {/* 페이지네이션 중앙 */}
      <div className="flex justify-center gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)} // 🔥 클릭 이벤트
            className={`w-8 h-8 border rounded 
              ${page === p ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
            `}
          >
            {p}
          </button>
        ))}
      </div>

        {/* 글등록 버튼 오른쪽 */}
        <button onClick={regClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded">
          글등록
        </button>

      </div>

    </div>
  );
}

