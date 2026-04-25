// src/pages/WritePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WritePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {
    
  if (!form.title || !form.content) {
    alert("제목/내용 입력해라");
    return;
  }
 

  try {
      await fetch("${import.meta.env.VITE_API_URL}/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( form ),
      });

      alert("작성 완료!");
       navigate("/noticePage");
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm border p-6 md:p-8">

        {/* 제목 */}
        {/* <h1 className="text-xl md:text-2xl font-bold mb-6">
          글 작성
        </h1> */}

        {/* 입력 영역 */}
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
  );
}