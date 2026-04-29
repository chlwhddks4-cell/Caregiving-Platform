import { useState ,useEffect} from "react";
import { useNavigate , useLocation  } from "react-router-dom";
import axios from "axios";

import { useAuth } from '../pages/context/AuthContext.tsx';

import { Modal, useModal } from "./components/Modal.tsx";



export default function WritePage() {
  const navigate = useNavigate();
  const location = useLocation();

const { user } = useAuth();  
    useEffect(() => {
      if (user && user.role !== 'admin') {
        alert("관리자만 접근 가능합니다.");
        navigate(-1);
      }
    }, [user]);

  const { modal, showAlert, showConfirm } = useModal();

  // 탭 정보 받기 (없으면 공지사항)
  const tab = location.state?.tab || '공지사항';

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [file, setFile] = useState<File | null>(null); // 파일 상태 추가

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      
      await showAlert("", "제목/내용 입력하시오.", "success");
      return;
    }

    // 관리자 체크
  if (user?.role !== 'admin') {
    await showAlert("", "관리자만 글을 작성할 수 있습니다.", "success");
    return;
  }

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('tab', tab); // 탭 추가!
      formData.append('user_id', user?.id || ''); // 추가!
      if (file) formData.append('file', file); // 파일 있으면 추가

      await axios.post(
        `${import.meta.env.VITE_API_URL}/write`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      await showAlert("", "글이 성공적으로 작성되었습니다.", "success");
      navigate("/NoticeGrid");
    } catch (err) {
      console.error(err);
      await showAlert("", "글 작성에 실패했습니다.", "error");
    }
  };

  

  return (
    <>
    <Modal {...modal} />
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm border p-6 md:p-8">

        <div className="flex flex-col gap-4">

          {/* 제목 */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 내용 */}
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            rows={15}
            className="border rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 파일 업로드 추가 */}
          <div style={{ border: "0.5px solid #d0cec8", borderRadius: 8, padding: "12px 16px" }}>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>첨부파일</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.hwp,.xlsx,.png,.jpg,.jpeg"
              style={{ fontSize: 13, color: "#1a1a1a" }}
            />
            {file && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 12, color: "#185FA5" }}>📎 {file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  style={{ fontSize: 12, color: "#A32D2D", background: "none", border: "none", cursor: "pointer" }}
                >
                  ✕ 삭제
                </button>
              </div>
            )}
          </div>

        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            등록
          </button>
        </div>

      </div>
    </div>
    </>
  );
}