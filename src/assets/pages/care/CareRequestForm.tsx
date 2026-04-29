import { useState , useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../context/AuthContext';

import { Modal, useModal } from "../components/Modal.tsx";

import axios from 'axios';

const DISEASES = ["치매", "뇌졸중", "골절", "암", "파킨슨", "당뇨", "기타"];
const CARE_TIMES = ["24시간", "주간 (8~18시)", "야간 (18~8시)", "협의 가능"];



import { REGIONS } from "../../data/regions";

export default function CareRequestForm() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { modal, showAlert, showConfirm } = useModal();
  const [form, setForm] = useState({
    title: "",
    city: "서울특별시",
    district: "강남구",
    startDate: "",
    endDate: "",
    careTime: "",
    dailyWage: "",
    wageType: "일급",
    patientAge: "",
    patientGender: "",
    mobility: "",
    diseases: [] as string[],  // 배열로 변경
    description: "",
  });

  const toggle = (key: "diseases" | "careTime", value: string) => {
    if (key === "careTime") {
      setForm((f) => ({ ...f, careTime: value }));
    } else {
      setForm((f) => ({
        ...f,
        diseases: f.diseases.includes(value)
          ? f.diseases.filter((d) => d !== value)
          : [...f.diseases, value],
      }));
    }
  };

 const [dateError, setDateError] = useState("");

const titleRef = useRef<HTMLInputElement>(null);
const startDateRef = useRef<HTMLInputElement>(null);
const endDateRef = useRef<HTMLInputElement>(null);


const wageTypeRef = useRef<HTMLSelectElement>(null);
const dailyWageRef = useRef<HTMLInputElement>(null);
const careTimeRef = useRef<HTMLDivElement>(null);
const districtRef = useRef<HTMLSelectElement>(null);
const cityRef = useRef<HTMLSelectElement>(null);



const validateDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);

  if (!form.title) {
    alert("제목을 입력해주세요.");
    titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    titleRef.current?.focus();
    return false;
  }

   if (!form.wageType) {
    alert("시작일을 입력해주세요.");
    wageTypeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    wageTypeRef.current?.focus();
    return false;
   }
   if (!form.dailyWage) {
    alert("급여 정보를 입력해주세요.");
    dailyWageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    dailyWageRef.current?.focus();
    return false;
   }
   if (!form.careTime) {
    alert("간병 시간을 입력해주세요.");
    careTimeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    careTimeRef.current?.focus();
    return false;
   }
   if (!form.district) {
    alert("지역(구/군)을 입력해주세요.");
    districtRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    districtRef.current?.focus();
    return false;
   }
     if (!form.city) {
    alert("지역 (시/도)를 입력해주세요.");
    cityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    cityRef.current?.focus();
    return false;
   }


  if (!form.startDate) {
    alert("시작일을 입력해주세요.");
    startDateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    startDateRef.current?.focus();
    return false;
  }
  if (!form.endDate) {
    alert("종료일을 입력해주세요.");
    endDateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    endDateRef.current?.focus();
    return false;
  }
  if (start < today) {
    alert("시작일은 오늘 이후여야 합니다.");
    startDateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    startDateRef.current?.focus();
    return false;
  }
  if (end < start) {
    alert("종료일은 시작일 이후여야 합니다.");
    endDateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    endDateRef.current?.focus();
    return false;
  }

  return true;
};

const today = new Date().toISOString().split("T")[0];

///// 제출 핸들러 
const handleSubmit = async () => {

  if ( !isLoggedIn) {
    await showAlert("", "로그인 후 이용해주세요.", "success");
    navigate('/auth?tab=login');
    return;
  }
  if (user?.role !== 'guardian') {
    await showAlert("", "보호자만 간병 요청을 등록할 수 있습니다.", "success");
    return;
 }
    if(!validateDates()) 
      return;  
    
    const ok = await showConfirm("간병 요청 등록", "간병 요청을 등록하시겠습니까?");
    if (!ok) return;

        try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/care-request`,
          {
            user_id: user?.id,
            title: form.title,
            city: form.city,
            district: form.district,
            start_date: form.startDate,
            end_date: form.endDate,
            care_time: form.careTime, //간병 시간
            daily_wage: form.dailyWage,
            wage_type: form.wageType,
            patient_age: form.patientAge || null,
            patient_gender: form.patientGender,
            mobility: form.mobility,
            diseases: form.diseases,  //질환 
            description: form.description,
          }
        );

        if (res.data.success) {
          alert('간병 요청이 등록되었습니다!');
          navigate('/careRequestList');
        }
      } catch (err) {
        alert('등록 실패');
        console.error(err);
      }
   
  };

  return (
    <>
    <Modal {...modal} />
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "1.5rem 1rem", fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* 헤더 */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>프라임케어</p>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>간병 요청 등록</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 6 }}>필수 항목을 입력하면 간병인 매칭이 시작됩니다.</p>
        </div>

        {/* 기본 정보 */}
        <Section title="기본 정보" required>
          <Field label="요청 제목">
            <input
              type="text"
              ref={titleRef}
              placeholder="예) 서울 노원구 어머니 간병인 구합니다"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              style={inputStyle}
            />
          </Field>
          <div style={grid2}>
            <Field label="지역 (시/도)">
              <select
                ref={cityRef}
                value={form.city}
                onChange={(e) => {
                  const city = e.target.value;
                  setForm((f) => ({ ...f, city, district: REGIONS[city][0] }));
                }}
                style={inputStyle}
              >
                {Object.keys(REGIONS).map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="지역 (구/군)">
              <select
                ref={districtRef}
                value={form.district}
                onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
                style={inputStyle}
              >
                {REGIONS[form.city].map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        {/* 간병 기간 */}
        <Section title="간병 기간" required>
         <div style={grid2}>
              <Field label="시작일">
                <input
                  type="date"
                  ref={startDateRef}
                  value={form.startDate}
                  min={today}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, startDate: e.target.value }));
                    
                  }}
                  style={inputStyle}
                />
              </Field>
              <Field label="종료일">
                <input
                  type="date"
                  ref={endDateRef}
                  value={form.endDate}
                  min={form.startDate || today}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, endDate: e.target.value }));
                    
                  }}
                  style={inputStyle}
                />
              </Field>
            </div>

            {dateError && (
              <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 4 }}>
                {dateError}
              </p>
            )}
          <Field label="간병 시간">
            <div style={tagRow} ref={careTimeRef} >
             
              {CARE_TIMES.map((t) => (
                <Tag key={t} selected={form.careTime === t} onClick={() => toggle("careTime", t)}>{t}</Tag>
              ))}
            </div>
          </Field>
        </Section>

        {/* 급여 정보 */}
        <Section title="급여 정보" required>
          <div style={grid2}>
            <Field label="일당">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="number"
                  ref={dailyWageRef}
                  placeholder="130000"
                  value={form.dailyWage}
                  onChange={(e) => setForm((f) => ({ ...f, dailyWage: e.target.value }))}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <span style={{ fontSize: 13, color: "#888", whiteSpace: "nowrap" }}>원 / 일</span>
              </div>
            </Field>
            <Field label="급여 방식">
              <select   ref={wageTypeRef}
              value={form.wageType} onChange={(e) => setForm((f) => ({ ...f, wageType: e.target.value }))} style={inputStyle}>
                <option>일급</option>
                <option>월급</option>
                <option>협의</option>
              </select>
            </Field>
          </div>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>최저임금 기준 일급 약 76,960원 이상 권장</p>
        </Section>

        {/* 환자 정보 */}
        <Section title="환자 정보" required={false}>
          <div style={grid3}>
            <Field label="나이">
              <input type="number" placeholder="75" value={form.patientAge} onChange={(e) => setForm((f) => ({ ...f, patientAge: e.target.value }))} style={inputStyle} />
            </Field>
            <Field label="성별">
              <select value={form.patientGender} onChange={(e) => setForm((f) => ({ ...f, patientGender: e.target.value }))} style={inputStyle}>
                <option>선택</option>
                <option>남성</option>
                <option>여성</option>
              </select>
            </Field>
            <Field label="거동 상태">
              <select value={form.mobility} onChange={(e) => setForm((f) => ({ ...f, mobility: e.target.value }))} style={inputStyle}>
                <option>선택</option>
                <option>거동 불가</option>
                <option>부분 가능</option>
                <option>독립 가능</option>
              </select>
            </Field>
          </div>
          <Field label="질환 / 특이사항">
            <div style={tagRow}>
              {DISEASES.map((d) => (
                <Tag key={d} selected={form.diseases.includes(d)} onClick={() => toggle("diseases", d)}>{d}</Tag>
              ))}
            </div>
          </Field>
        </Section>

        {/* 상세 내용 */}
        <Section title="상세 내용" required={false}>
          <Field label="요청 내용">
            <textarea
              placeholder="간병 업무 내용, 환자 상태, 특별 요청사항 등을 자세히 입력해주세요."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              style={{ ...inputStyle, height: 120, resize: "vertical" }}
            />
          </Field>
        </Section>

        {/* 버튼 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, marginTop: 8 }}>
          <button onClick={() => navigate('/careRequestList') } style={btnSecondary}>취소</button>
          <button onClick={handleSubmit} style={btnPrimary}>등록하기</button>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
    </>
  );
}

function Section({ title, required, children }: { title: string; required: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #e8e6e0", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem", paddingBottom: 10, borderBottom: "0.5px solid #e8e6e0" }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{title}</p>
        {required
          ? <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#FCEBEB", color: "#A32D2D" }}>필수</span>
          : <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#F1EFE8", color: "#5F5E5A" }}>선택</span>
        }
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "0.875rem" }}>
      <label style={{ display: "block", fontSize: 13, color: "#888", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function Tag({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <span
      onClick={onClick}
      style={{
        fontSize: 12,
        padding: "5px 12px",
        borderRadius: 20,
        border: selected ? "0.5px solid #1D9E75" : "0.5px solid #d0cec8",
        background: selected ? "#E1F5EE" : "#fff",
        color: selected ? "#0F6E56" : "#888",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {children}
    </span>
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

const grid2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 12,
};

const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: 12,
};

const tagRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 4,
};

const btnPrimary: React.CSSProperties = {
  padding: "11px",
  background: "#1D9E75",
  color: "#E1F5EE",
  border: "none",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "11px",
  background: "#fff",
  color: "#888",
  border: "0.5px solid #d0cec8",
  borderRadius: 8,
  fontSize: 14,
  cursor: "pointer",
};
