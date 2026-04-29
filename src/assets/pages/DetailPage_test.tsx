// src/pages/DetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // 🔥 상세 조회
  useEffect(() => {
    fetch(`http://localhost:4000/detail/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setForm({
          title: res.title,
          content: res.content,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 🔥 수정 저장
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("제목/내용 입력해라");
      return;
    }

    if (!confirm("수정 하시겠습니까?")) return;

    try {
      await fetch(`http://localhost:4000/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("수정 완료");

      setIsEditMode(false);

      // 최신 데이터 다시 불러오기
      const res = await fetch(`http://localhost:4000/detail/${id}`);
      const newData = await res.json();
      setData(newData);

    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  // 🔥 삭제
  const handleDelete = async () => {
    if (!confirm("삭제 하시겠습니까?")) return;

    try {
      await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
      });

      alert("삭제 완료");

      navigate("/noticePage");

    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  // 🔥 로딩 처리
  if (!data) return <div className="p-10">로딩중...</div>;

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow border p-6 md:p-8">

        {/* 제목 */}
        {isEditMode ? (
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border rounded px-4 py-2 mb-4"
          />
        ) : (
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            {data.title}
          </h1>
        )}

        {/* 정보 */}
        <div className="flex justify-between text-sm text-gray-500 border-b pb-3 mb-4">
          <div>작성자: {data.writer || "관리자"}</div>
          <div>
            작성일: {data.created_at} | 조회수: {data.views}
          </div>
        </div>

        {/* 내용 */}
        {isEditMode ? (
          <textarea
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            className="w-full min-h-[200px] border rounded px-4 py-3"
          />
        ) : (
          <div className="min-h-[200px] text-gray-800 whitespace-pre-line">
            {data.content}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-between mt-6">

          {/* 목록 */}
          <button
            onClick={() => navigate("/noticePage")}
            className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            목록
          </button>

          <div className="flex gap-2">

            {/* 수정 */}
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                수정
              </button>
            )}

            {/* 저장 */}
            {isEditMode && (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                저장
              </button>
            )}

            {/* 삭제 */}
            <button
              onClick={handleDelete}
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