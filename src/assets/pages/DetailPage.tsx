// src/pages/WritePage.tsx
import { useState , useEffect } from "react";
import { useNavigate, useParams , useLocation   } from "react-router-dom";

import { useAuth } from '../pages/context/AuthContext.tsx';

import { Modal, useModal } from "./components/Modal.tsx";


export default function DetailPage() {
  const navigate = useNavigate();
const { modal, showAlert, showConfirm } = useModal();
  const { user } = useAuth();
const isAdmin = user?.role === 'admin';
  
   const { id } = useParams();

   const location = useLocation();
    const tab = location.state?.tab || '공지사항';

   
   const [isEditMode, setEdit] = useState(true); // 수정
   const [isCancelMode, setCancelEdit] = useState(false);  //취소
   const [isRegMode, setRegEdit] = useState(false);  //등록

   const [isEditTextMode, setIsEditTextMode] = useState(false);
   
   // 파일 상태 추가
const [newFile, setNewFile] = useState<File | null>(null);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setNewFile(e.target.files[0]);
  }
};


   
   const [form, setForm] = useState({
  title: "",
  content: "",
  writer: "",
  created_at: "",
  views: "",
  id: "",
  filename: "",       // 추가
  originalname: "",   // 추가
});

const [original, setOriginal] = useState({
  title: "",
  content: "",
  writer: "",
  created_at: "",
  views: "",
  id: "",
  filename: "",       // 추가
  originalname: "",   // 추가
});

    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/detail/${id}`)
        .then((res) => res.json())
        .then((res) => {
        // 🔥 여기 핵심
              setForm({
              title: res.title,
              content: res.content,
              writer: res.writer,
              created_at: res.created_at,
              views: res.views,
              id: res.id,
              filename: res.filename || "",       // 추가
              originalname: res.originalname || "", // 추가
            });
            setOriginal({
              title: res.title,
              content: res.content,
              writer: res.writer,
              created_at: res.created_at,
              views: res.views,
              id: res.id,
              filename: res.filename || "",       // 추가
              originalname: res.originalname || "", // 추가
            });
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

  const formData = new FormData();
    formData.append('id', form.id);
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (newFile) formData.append('file', newFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/update`, {
        method: "POST",
        // headers 제거! formData 쓸 때는 자동으로 설정됨
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
      navigate("/noticeGrid");
    } catch (err) {
      console.error(err);
    }
};

//** 게시글  취소버튼  **/
 const handleCancel = () => {
  setRegEdit(false);
  setIsEditTextMode(false);
  setNewFile(null); // 파일 초기화
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
    

      const ok = await showConfirm("", "삭제 하시겠습니까?");
      if (!ok) return;

   try {
      await fetch(`${import.meta.env.VITE_API_URL}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },       
        body: JSON.stringify({ id })
      }).then((res) => res.json())
                .then((res) => {
                  showAlert("", res.message, "success");
                  
                });

 

    //   alert("삭제 완료!");
       navigate("/noticeGrid");
    } catch (err) {
      console.error(err);
    }
  };

  


  return (
    <>
           <Modal {...modal} />
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

          {/* 첨부파일 */}
          <div style={{ border: "0.5px solid #d0cec8", borderRadius: 8, padding: "12px 16px" }}>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>첨부파일</p>

            {/* 기존 파일 */}
            {form.filename && !newFile && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isEditTextMode ? 10 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>📎</span>
                  <span style={{ fontSize: 13, color: "#1a1a1a" }}>{form.originalname}</span>
                </div>
                <button
                  onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/download/${form.id}`}
                  style={{ padding: "6px 14px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}
                >
                  📥 다운로드
                </button>
              </div>
            )}

            {/* 새 파일 선택됨 */}
            {newFile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span>📎</span>
                <span style={{ fontSize: 13, color: "#185FA5" }}>{newFile.name}</span>
                <button
                  onClick={() => setNewFile(null)}
                  style={{ fontSize: 12, color: "#A32D2D", background: "none", border: "none", cursor: "pointer" }}
                >
                  ✕ 삭제
                </button>
              </div>
            )}

            {/* 수정 모드일 때만 파일 변경 가능 */}
            {isEditTextMode && (
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.hwp,.xlsx,.png,.jpg,.jpeg"
                style={{ fontSize: 13, color: "#1a1a1a" }}
              />
            )}
          </div>

        </div>

        {/* 버튼 */}
        <div className="flex justify-between mt-6">

        <button
            onClick={() => navigate("/noticeGrid", { state: { tab: tab } })}
            className="px-5 py-2 rounded-lg border text-gray-600   text-white bg-gray-600 hover:bg-gray-700" 
          >
            목록
          </button>


         <div className="flex gap-2">
        
         {/* 취소, 수정, 등록 버튼 - 관리자만 */}
        {isAdmin && (
          <>
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
          </>
        )}
          </div>
           
        </div>

      </div>
      
    </div>
    </>
  );
}