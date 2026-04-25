import { useState, useEffect } from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


import { useAuth } from '../context/AuthContext';


import './auth.css';

export default function Auth() {

  const { login } = useAuth();  // 알림판 가져오기
  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("guardian"); // guardian | caregiver
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [identityAgreed, setIdentityAgreed] = useState(false);
  const [terms, setTerms] = useState({ all: false, service: false, privacy: false, age: false });
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ id : "" ,name: "", phone: "", verifyCode: "", email: "", password: "", passwordConfirm: "" });
  const [idChecked, setIdChecked] = useState(false);
  const [idAvailable, setIdAvailable] = useState(false);
  const navigate = useNavigate();

const emailDomains = [
  'naver.com',
  'gmail.com',
  'daum.net',
  'kakao.com',
  'nate.com',
  '직접입력'
];

const [emailId, setEmailId] = useState('');
const [emailDomain, setEmailDomain] = useState('naver.com');
const [isDirectInput, setIsDirectInput] = useState(false);

const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  if (value === '직접입력') {
    setIsDirectInput(true);
    setEmailDomain('');
  } else {
    setIsDirectInput(false);
    setEmailDomain(value);
  }
  // form.email 업데이트
  setForm({ ...form, email: `${emailId}@${value === '직접입력' ? '' : value}` });
};

const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmailId(e.target.value);
  setForm({ ...form, email: `${e.target.value}@${emailDomain}` });
};





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    

  if (name === 'id') {
    // 영문 숫자만 허용, 나머지 입력 차단
    const filtered = value.replace(/[^a-zA-Z0-9]/g, '');
    setForm({ ...form, [name]: filtered });
    return;
  }

    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'id') {
      setIdChecked(false);
      setIdAvailable(false);
    }
  };

//////
/// 로그인 핸들러
/////
  const handleLogin = async () => {

  try {
    const res = await axios.post('${import.meta.env.VITE_API_URL}/login', {
      id: form.id,
      password: form.password
    });

    // 토큰 저장
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    // 헤더 기본값으로 토큰 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

    login(res.data.user, res.data.token);  // 👈 알림판에 기록

    console.log('로그인 성공:', res.data);
    // 로그인 성공 → 메인페이지 이동
    navigate('/');

  } catch (err: any) {
    alert(err.response?.data?.message || '로그인 실패');
  }
};
 

  const handleCheckId = async () => {
    if (!form.id) return alert("아이디를 입력해주세요.");

    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/check-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: form.id }),
      });

      const data = await response.json();

      if (data.available) {
        setIdAvailable(true);
        setIdChecked(true);
        alert("사용 가능한 아이디입니다.");
      } else {
        setIdAvailable(false);
        setIdChecked(true);
        alert("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error('아이디 체크 오류:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };



// useState 바로 아래에 추가
const [searchParams] = useSearchParams();

useEffect(() => {
  const tab = searchParams.get('tab');
  
  


  if (tab === 'register') {
      setMode('register') 
    } else if (tab === 'login') {
      
      setMode('login');
      
    }
}, [searchParams ]);

  // const handleSendPhone = () => {
  //   if (!form.phone) return alert("휴대폰 번호를 입력해주세요.");
  //   setPhoneSent(true);
  // };

  // const handleVerifyCode = () => {
  //   if (form.verifyCode === "1234") {
  //     setPhoneVerified(true);
  //   } else {
  //     alert("인증번호가 올바르지 않습니다. (테스트: 1234)");
  //   }
  // };

  const handleTermsAll = (checked: boolean) => {
    setTerms({ all: checked, service: checked, privacy: checked, age: checked });
  };

  const handleTerm = (key: keyof typeof terms, checked: boolean) => {
    const next = { ...terms, [key]: checked };
    next.all = next.service && next.privacy && next.age;
    setTerms(next);
  };

  const canSubmitRegister = () => {
    if (!form.id || !form.name || !form.phone || !form.email || !form.password || !form.passwordConfirm) {
         alert("모든 필드를 입력해주세요.");
      return false;
    }
    if (!idChecked || !idAvailable) {
      alert("아이디 중복 체크를 해주세요.");
      return false;
    }
    // if (!phoneVerified)
    // { alert("휴대폰 인증을 완료해주세요.");
    //   return false;   
    // }
    if (!terms.service || !terms.privacy || !terms.age)
      { alert("약관에 동의해주세요.");
      return false;   
    }
    if (role === "caregiver" && !identityAgreed)
        { alert("약관에 동의해주세요.");
      return false;   
    }
    if (form.password !== form.passwordConfirm) { alert("비밀번호가 일치하지 않습니다."); return false; }
    return true;
  };

  const handleSubmit = async () => { //회원가입 버튼

    if(!canSubmitRegister())
      return;

     
    if (mode === "register") {
      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : form.id, 
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password,
            role: role,
            identityAgreed: identityAgreed,
          }),
        });

        const data = await response.json();

        if ( data.success) {
          alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        } else {
          alert(data.message || '회원가입 실패');
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('서버 오류가 발생했습니다.');
      }
    } else {
      alert("로그인 되었습니다! (데모)");
    }
  };

  return (
    <>
      <div className="auth-wrap">
        {/* 왼쪽 패널 */}
       

        {/* 오른쪽 폼 */}
        <div className="auth-right">
          <div className="auth-card">
            {/* 탭 */}
            <div className="tab-group">
              <button className={`tab-btn ${mode === "login" ? "active" : ""}`} onClick={() => { 
                setMode("login"); setSuccess(false); 
              setForm({ id: '', name: '', phone: '', email: '', password: '', passwordConfirm: '', verifyCode: '' });
              }
                
                }>로그인</button>
              <button className={`tab-btn ${mode === "register" ? "active" : ""}`} onClick={() => { 
                setMode("register"); setSuccess(false);
                setForm({ id: '', name: '', phone: '', email: '', password: '', passwordConfirm: '', verifyCode: '' });
                }}>회원가입</button>
            </div>

            {success && (
              <div className="success-banner">
                ✅ 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.
              </div>
            )}

            {/* 로그인 */}
            {mode === "login" && (
              <>
                <div className="form-title">만나서 반가워요 👋</div>
                
                <div className="field-group">
                  <div>
                    <label className="field-label">아이디<span className="field-required">*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">✉️</span>
                      <input className="field-input" name="id" type="id" placeholder="아이디 입력" value={form.id} onChange={handleChange} />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">비밀번호<span className="field-required">*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input className="field-input" name="password" type="password" placeholder="비밀번호 입력" 
                      value={form.password} onChange={handleChange}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogin(); // 👈 엔터 시 로그인
                      }}
                      />
                    </div>
                  </div>
                </div>

                {/* 아이디/비밀번호 찾기 */}
                <div style={{ 
                  textAlign: 'left',      // 👈 왼쪽 정렬
                  margin: '16px 0',       // 👈 위아래 공간
                }}>
                                <span 
                  className="find-link" 
                  onClick={() => navigate('/find-account')}
                  style={{ 
                    fontSize: '15px', 
                    color: '#0f66e9',        // 👈 파란색
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#93C5FD')}  // 👈 호버 시 연한 파랑
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#0f66e9')}  // 👈 원래 파랑으로
                >
                  아이디/비밀번호 찾기
                </span>
                </div>

                <button className="submit-btn" onClick={handleLogin}>로그인</button>

                <div className="switch-text">
                  계정이 없으신가요?{" "}
                  <span className="switch-link" onClick={() => setMode("register")}>회원가입</span>
                </div>
              </>
            )}

            {/* 회원가입 */}
            {mode === "register" && (
              <>
                <div className="form-title">회원가입</div>
                <div className="form-subtitle">역할을 선택하고 정보를 입력해주세요.</div>

                {/* 역할 선택 */}
                <div className="role-group">
                  <div className={`role-card ${role === "guardian" ? "selected" : ""}`} onClick={() => setRole("guardian")}>
                    <span className="role-emoji">👨‍👩‍👧</span>
                    <span className="role-label">보호자</span>
                    <span className="role-desc">간병인을 찾고 있어요</span>
                  </div>
                  <div className={`role-card ${role === "caregiver" ? "selected" : ""}`} onClick={() => setRole("caregiver")}>
                    <span className="role-emoji">🧑‍⚕️</span>
                    <span className="role-label">간병인</span>
                    <span className="role-desc">간병 일자리를 찾고 있어요</span>
                  </div>
                </div>

                <div className="field-group">

                    {/* 회원 아이디 */}
                  <div>
                    <label className="field-label">회원 아이디<span className="field-required">*</span></label>
                    <div className="id-row">
                      <div className="input-wrap" style={{ flex: 1 }}>
                        <span className="input-icon">👤</span>
                        <input className="field-input" name="id" placeholder="아이디를 입력하세요" value={form.id} 
                        
                        onChange={handleChange}
                         />

                    
                      </div>
                      <button className="verify-btn" onClick={handleCheckId} >
                        {"중복 체크"}
                      </button>
                    </div>
                  </div>

                  {/* 이름 */}
                  <div>
                    <label className="field-label">이름<span className="field-required">*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">👤</span>
                      <input className="field-input" name="name" placeholder="실명 입력" value={form.name} onChange={handleChange} />
                    </div>
                  </div>

                  {/* 휴대폰 인증 */}
                  <div>
                    <label className="field-label">휴대폰 <span className="field-required">*</span></label>
                    <div className="phone-row">
                      <div className="input-wrap" style={{ flex: 1 }}>
                        <span className="input-icon">📱</span>
                        <input className="field-input" name="phone" placeholder="010-0000-0000" value={form.phone} onChange={handleChange} disabled={phoneSent} />
                      </div>
                      {/* <button className={`verify-btn ${phoneSent ? "sent" : ""}`} onClick={handleSendPhone} disabled={phoneSent}>
                        {phoneSent ? "전송됨" : "인증번호 전송"}
                      </button> */}
                    </div>
                    {/* { {phoneSent && !phoneVerified && (
                      <div className="verify-code-wrap">
                        <div className="phone-row">
                          <div className="input-wrap" style={{ flex: 1 }}>
                            <span className="input-icon">🔢</span>
                            <input className="field-input" name="verifyCode" placeholder="인증번호 6자리 (테스트: 1234)" value={form.verifyCode} onChange={handleChange} />
                          </div>
                          <button className="verify-btn" onClick={handleVerifyCode}>확인</button>
                        </div>
                        <div className="verify-hint">📩 인증번호가 발송되었습니다.</div>
                      </div>
                    )}
                    {phoneVerified && <div className="verify-hint">✅ 휴대폰 인증 완료!</div>} } */}
                  </div>

                  {/* 이메일 */}
                  <div>
                    <label className="field-label">회원 이메일 주소<span className="field-required">*</span></label>
                    <div className="email-row">

                      {/* 아이디 입력 */}
                      <input
                        className="field-input-email"
                        style={{ flex: 3 }}
                        placeholder="이메일 아이디"
                        value={emailId}
                        onChange={handleEmailIdChange}
                      />

                      <span style={{ padding: '0 6px', color: 'var(--gray-600)' }}>@</span>

                      {/* 도메인 직접 입력 */}
                      <input
                        className="field-input-email"
                        style={{ flex: 2 }}
                        placeholder="직접입력"
                        value={emailDomain}
                        onChange={(e) => {
                          setEmailDomain(e.target.value);
                          setForm({ ...form, email: `${emailId}@${e.target.value}` });
                        }}
                      />

                      {/* 도메인 선택 */}
                      <select
                        className="field-input-email"
                        style={{ flex: 2, cursor: 'pointer' }}
                        value={emailDomain}
                        onChange={handleDomainChange}
                      >
                        {emailDomains.map((domain) => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>

                    </div>
                  </div>

                  {/* 비밀번호 */}
                  <div>
                    <label className="field-label">비밀번호<span className="field-required">*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input className="field-input" name="password" type="password" placeholder="8자 이상, 영문+숫자+특수문자" value={form.password} onChange={handleChange} />
                    </div>
                  </div>

                  {/* 비밀번호 확인 */}
                  <div>
                    <label className="field-label">비밀번호 확인<span className="field-required">*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input className={`field-input ${form.passwordConfirm && form.password !== form.passwordConfirm ? "error" : ""}`} name="passwordConfirm" type="password" placeholder="비밀번호 재입력" value={form.passwordConfirm} onChange={handleChange} />
                    </div>
                    {form.passwordConfirm && form.password !== form.passwordConfirm && (
                      <div className="error-msg">⚠️ 비밀번호가 일치하지 않습니다.</div>
                    )}
                  </div>
                </div>

                {/* 간병인 신원조회 섹션 */}
                {role === "caregiver" && (
                  <div className="identity-section">
                    <div className="identity-title">⚠️ 간병인 신원조회 안내</div>
                    <div className="identity-desc">
                      케어브릿지는 보호자의 안전을 위해 모든 간병인의 신원조회를 실시합니다.{"\n"}
                      가입 완료 후 신원조회 절차가 진행되며, 확인 완료 후 활동이 가능합니다.{"\n"}
                      • 범죄경력 조회 포함{"\n"}
                      • 처리 기간: 영업일 기준 1~3일{"\n"}
                      • 허위 정보 제공 시 즉시 계정 정지
                    </div>
                    <label className="identity-check">
                      <input type="checkbox" checked={identityAgreed} onChange={(e) => setIdentityAgreed(e.target.checked)} />
                      <span className="identity-check-label">신원조회에 동의하며, 정확한 정보를 제공할 것을 확인합니다.</span>
                    </label>
                  </div>
                )}

                {/* 약관 동의 */}
                <div className="terms-group">
                  <label className="terms-item">
                    <input type="checkbox" checked={terms.all} onChange={(e) => handleTermsAll(e.target.checked)} />
                    <span style={{ fontWeight: 700 }}>전체 동의</span>
                  </label>
                  <div style={{ height: 1, background: "var(--gray-200)", margin: "4px 0" }} />
                  {[
                    { key: "service", label: "서비스 이용약관 동의 (필수)" },
                    { key: "privacy", label: "개인정보 처리방침 동의 (필수)" },
                    { key: "age", label: "만 14세 이상 확인 (필수)" },
                  ].map(({ key, label }) => (
                    <label className="terms-item" key={key}>
                      <input type="checkbox" checked={terms[key as keyof typeof terms]} onChange={(e) => handleTerm(key as keyof typeof terms, e.target.checked)} />
                      <span>{label}</span>
                      <span className="terms-link">보기</span>
                    </label>
                  ))}
                </div>

                <button className="submit-btn" onClick={handleSubmit} >
                  {role === "caregiver" ? "간병인으로 가입하기" : "보호자로 가입하기"}
                </button>

                <div className="switch-text">
                  이미 계정이 있으신가요?{" "}
                  <span className="switch-link" onClick={() => setMode("login")}>로그인</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
