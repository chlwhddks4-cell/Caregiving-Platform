// src/pages/WritePage.tsx
import { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailPage() {
  const navigate = useNavigate();
  
   const { id } = useParams();

   
   const [isEditMode, setEdit] = useState(true); // 수정
   const [isCancelMode, setCancelEdit] = useState(false);  //취소
   const [isRegMode, setRegEdit] = useState(false);  //등록

   const [isEditTextMode, setIsEditTextMode] = useState(false);
   
   
   const [original, setOriginal] = useState({
        title: "",
        content: "",
        writer : "",
        created_at : "",
        views : "",
        id : ""
  });

  const [form, setForm] = useState({
    title: "",
    content: "",
    writer : "",
    created_at : "",
    views : "",
    id : ""
  });


    useEffect(() => {
    fetch(`http://localhost:4000/detail/${id}`)
        .then((res) => res.json())
        .then((res) => {
        // 🔥 여기 핵심
        setForm({
            title: res.title,
            content: res.content,
            writer: res.writer,
            created_at: res.created_at,
            views: res.views,
              id : res.id
            });
            setOriginal ({
              title: res.title,
            content: res.content,
            writer: res.writer,
            created_at: res.created_at,
            views: res.views,
              id : res.id
            })
        });
    }, [id]);
  


  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //** 게시글 수정 **/
 const handleSubmit = async () => {
  if (!form.title || !form.content) {
    alert("내용 입력하시오.");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message);

    navigate("/noticePage"); // ✅ 여기로 이동
  } catch (err) {
    console.error(err);
  }
};

//** 게시글  취소버튼  **/
  const handleCancel = () => {

      setRegEdit(false);
      setIsEditTextMode(false);

      setForm(original);
};
  

//** 게시글 수정 활성화  **/
  const handleEdit = () => {
    
       setIsEditTextMode(true);
       setCancelEdit(true);
       setRegEdit(true);
  }

//** 게시글 삭제 **/
  const handleDeleteSubmit = async () => {
    
     if (!confirm("삭제 하시겠습니까?")) return;

   try {
      await fetch(`http://localhost:4000/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },       
        body: JSON.stringify({ id })
      }).then((res) => res.json())
                .then((res) => {
                  alert(res.message);
                });

 

    //   alert("삭제 완료!");
       navigate("/noticePage");
    } catch (err) {
      console.error(err);
    }
  };

  


  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm border p-6 md:p-8">

     

        {/* 입력 영역 */}
        <div className="flex flex-col gap-4">

          {/* 제목 */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled
            placeholder="제목을 입력하세요"
            className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="id"
            value={form.id}
              style={{ display: "none" }}
            />

         <div className="flex text-sm text-gray-500 border-b pb-3 mb-2">
                
                <span className="ml-4">작성자: {form.writer}  </span>
                <span className="ml-5">|</span>
                <span className="ml-5"> 작성일: {form.created_at} </span>
                <span className="ml-5">|</span>
                <span className="ml-5">조회수: {form.views} </span> 
         </div>

          {/* 내용 */}
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            disabled={!isEditTextMode} // 🔥 핵심
            placeholder="내용을 입력하세요"
            rows={15}
            className="border rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* 버튼 */}
        <div className="flex justify-between mt-6">


        <button
            onClick={() => navigate("/noticeGrid")}
            className="px-5 py-2 rounded-lg border text-gray-600   text-white bg-gray-600 hover:bg-gray-700" 
          >
            목록
          </button>

         <div className="flex gap-2">
        
         <button
            disabled={!isCancelMode}
            onClick={handleCancel}
            className={`px-5 py-2 rounded-lg text-white
              ${isCancelMode 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            취소
          </button>

         <button
            disabled={!isEditMode}
            onClick={handleEdit}
            className={`px-5 py-2 rounded-lg text-white
              ${isEditMode 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            수정
          </button>

          <button
            disabled={!isRegMode}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-lg text-white
              ${isRegMode 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            등록
          </button>

            <button
            onClick={handleDeleteSubmit}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            삭제
          </button>

          </div>

          

        </div>

      </div>
    </div>
  );
}