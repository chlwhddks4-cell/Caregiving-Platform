import { useState } from "react";


import './FindAccount.css';

import { useNavigate } from 'react-router-dom';

export default function FindAccount({ onBack }: { onBack?: () => void }) {
  const [tab, setTab] = useState<"id" | "password">("id");

  // 아이디 찾기
  const [idName, setIdName] = useState("");
  const [idPhone, setIdPhone] = useState("");
  const [idPhoneSent, setIdPhoneSent] = useState(false);
  const [idPhoneVerified, setIdPhoneVerified] = useState(false);
  const [idCode, setIdCode] = useState("");
  const [foundId, setFoundId] = useState("");

  // 비밀번호 찾기
  const [pwId, setPwId] = useState("");
  const [pwPhone, setPwPhone] = useState("");
  const [pwPhoneSent, setPwPhoneSent] = useState(false);
  const [pwPhoneVerified, setPwPhoneVerified] = useState(false);
  const [pwCode, setPwCode] = useState("");
  const [pwStep, setPwStep] = useState<"verify" | "reset" | "done">("verify");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleTabChange = (t: "id" | "password") => {
    setTab(t);
    // 초기화
    setIdName(""); setIdPhone(""); setIdPhoneSent(false);
    setIdPhoneVerified(false); setIdCode(""); setFoundId("");
    setPwId(""); setPwPhone(""); setPwPhoneSent(false);
    setPwPhoneVerified(false); setPwCode(""); setPwStep("verify");
    setNewPassword(""); setNewPasswordConfirm("");
  };

  // 아이디 찾기 - 인증번호 전송
  const handleIdSendPhone = () => {
    if (!idPhone) return alert("휴대폰 번호를 입력해주세요.");
    setIdPhoneSent(true);
  };

  // 아이디 찾기 - 인증번호 확인
  const handleIdVerify = () => {
    if (idCode === "1234") {
      setIdPhoneVerified(true);
    } else {
      alert("인증번호가 올바르지 않습니다. (테스트: 1234)");
    }
  };

  // 아이디 찾기 - 제출
  const handleFindId = () => {
    // 실제로는 API 호출
    setFoundId("hong***");
  };

  // 비밀번호 찾기 - 인증번호 전송
  const handlePwSendPhone = () => {
    if (!pwPhone) return alert("휴대폰 번호를 입력해주세요.");
    setPwPhoneSent(true);
  };

  // 비밀번호 찾기 - 인증번호 확인
  const handlePwVerify = () => {
    if (pwCode === "1234") {
      setPwPhoneVerified(true);
      setPwStep("reset");
    } else {
      alert("인증번호가 올바르지 않습니다. (테스트: 1234)");
    }
  };

  // 비밀번호 재설정
  const handleResetPassword = () => {
    if (newPassword !== newPasswordConfirm) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    setPwStep("done");
  };

  return (
    <>
      
      <div className="find-wrap">
        <div className="find-card">

          {/* 뒤로가기 */}
          <div className="find-back" onClick={() => navigate('/auth')}>
            ← 로그인으로 돌아가기
          </div>

          <div className="find-title">계정 찾기</div>
          <div className="find-subtitle">
            가입 시 등록한 정보로 아이디/비밀번호를 찾을 수 있어요.
          </div>

          {/* 탭 */}
          <div className="find-tab-group">
            <button className={`find-tab-btn ${tab === "id" ? "active" : ""}`} onClick={() => handleTabChange("id")}>
              아이디 찾기
            </button>
            <button className={`find-tab-btn ${tab === "password" ? "active" : ""}`} onClick={() => handleTabChange("password")}>
              비밀번호 찾기
            </button>
          </div>

          {/* ─── 아이디 찾기 ─── */}
          {tab === "id" && (
            <>
              {!foundId ? (
                <>
                  <div className="field-group">
                    {/* 이름 */}
                    <div>
                      <label className="field-label">이름<span className="field-required">*</span></label>
                      <div className="input-wrap">
                        <span className="input-icon">👤</span>
                        <input className="field-input" placeholder="실명 입력" value={idName} onChange={(e) => setIdName(e.target.value)} />
                      </div>
                    </div>

                    {/* 휴대폰 인증 */}
                    <div>
                      <label className="field-label">휴대폰 인증<span className="field-required">*</span></label>
                      <div className="phone-row">
                        <div className="input-wrap">
                          <span className="input-icon">📱</span>
                          <input className="field-input" placeholder="010-0000-0000" value={idPhone} onChange={(e) => setIdPhone(e.target.value)} disabled={idPhoneSent} />
                        </div>
                        <button className="verify-btn" onClick={handleIdSendPhone} disabled={idPhoneSent}>
                          {idPhoneSent ? "전송됨" : "인증번호 전송"}
                        </button>
                      </div>

                      {idPhoneSent && !idPhoneVerified && (
                        <div style={{ marginTop: 8 }}>
                          <div className="phone-row">
                            <div className="input-wrap">
                              <span className="input-icon">🔢</span>
                              <input className="field-input" placeholder="인증번호 입력 (테스트: 1234)" value={idCode} onChange={(e) => setIdCode(e.target.value)} />
                            </div>
                            <button className="verify-btn" onClick={handleIdVerify}>확인</button>
                          </div>
                          <div className="verify-hint">📩 인증번호가 발송되었습니다.</div>
                        </div>
                      )}
                      {idPhoneVerified && <div className="verify-hint">✅ 휴대폰 인증 완료!</div>}
                    </div>
                  </div>

                  <button
                    className="submit-btn"
                    onClick={handleFindId}
                    disabled={!idName || !idPhoneVerified}
                  >
                    아이디 찾기
                  </button>
                </>
              ) : (
                <>
                  <div className="result-box">
                    <div className="result-icon">🎉</div>
                    <div className="result-title">아이디를 찾았어요!</div>
                    <div className="result-value">{foundId}</div>
                    <div className="result-desc">
                      보안을 위해 일부 정보는 가려서 표시됩니다.
                    </div>
                  </div>
                  <button className="submit-btn" onClick={onBack}>
                    로그인하러 가기
                  </button>
                </>
              )}
            </>
          )}

          {/* ─── 비밀번호 찾기 ─── */}
          {tab === "password" && (
            <>
              {/* STEP 1 - 본인 인증 */}
              {pwStep === "verify" && (
                <>
                  <div className="field-group">
                    {/* 아이디 */}
                    <div>
                      <label className="field-label">아이디<span className="field-required">*</span></label>
                      <div className="input-wrap">
                        <span className="input-icon">👤</span>
                        <input className="field-input" placeholder="아이디 입력" value={pwId} onChange={(e) => setPwId(e.target.value)} />
                      </div>
                    </div>

                    {/* 휴대폰 인증 */}
                    <div>
                      <label className="field-label">휴대폰 인증<span className="field-required">*</span></label>
                      <div className="phone-row">
                        <div className="input-wrap">
                          <span className="input-icon">📱</span>
                          <input className="field-input" placeholder="010-0000-0000" value={pwPhone} onChange={(e) => setPwPhone(e.target.value)} disabled={pwPhoneSent} />
                        </div>
                        <button className="verify-btn" onClick={handlePwSendPhone} disabled={pwPhoneSent}>
                          {pwPhoneSent ? "전송됨" : "인증번호 전송"}
                        </button>
                      </div>

                      {pwPhoneSent && !pwPhoneVerified && (
                        <div style={{ marginTop: 8 }}>
                          <div className="phone-row">
                            <div className="input-wrap">
                              <span className="input-icon">🔢</span>
                              <input className="field-input" placeholder="인증번호 입력 (테스트: 1234)" value={pwCode} onChange={(e) => setPwCode(e.target.value)} />
                            </div>
                            <button className="verify-btn" onClick={handlePwVerify}>확인</button>
                          </div>
                          <div className="verify-hint">📩 인증번호가 발송되었습니다.</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    className="submit-btn"
                    disabled={!pwId || !pwPhoneVerified}
                    onClick={handlePwVerify}
                  >
                    본인 인증하기
                  </button>
                </>
              )}

              {/* STEP 2 - 비밀번호 재설정 */}
              {pwStep === "reset" && (
                <>
                  <div className="step-badge">✅ 본인 인증 완료 · 새 비밀번호를 설정해주세요</div>
                  <div className="new-password-section">
                    <div>
                      <label className="field-label">새 비밀번호<span className="field-required">*</span></label>
                      <div className="input-wrap">
                        <span className="input-icon">🔒</span>
                        <input className="field-input" type="password" placeholder="8자 이상, 영문+숫자+특수문자" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="field-label">새 비밀번호 확인<span className="field-required">*</span></label>
                      <div className="input-wrap">
                        <span className="input-icon">🔒</span>
                        <input
                          className="field-input"
                          type="password"
                          placeholder="비밀번호 재입력"
                          value={newPasswordConfirm}
                          onChange={(e) => setNewPasswordConfirm(e.target.value)}
                          style={{ borderColor: newPasswordConfirm && newPassword !== newPasswordConfirm ? 'var(--error)' : '' }}
                        />
                      </div>
                      {newPasswordConfirm && newPassword !== newPasswordConfirm && (
                        <div style={{ fontSize: 12, color: 'var(--error)', marginTop: 5 }}>⚠️ 비밀번호가 일치하지 않습니다.</div>
                      )}
                    </div>
                  </div>

                  <button
                    className="submit-btn"
                    onClick={handleResetPassword}
                    disabled={!newPassword || !newPasswordConfirm}
                  >
                    비밀번호 재설정
                  </button>
                </>
              )}

              {/* STEP 3 - 완료 */}
              {pwStep === "done" && (
                <>
                  <div className="result-box">
                    <div className="result-icon">🔐</div>
                    <div className="result-title">비밀번호가 변경되었어요!</div>
                    <div className="result-desc">
                      새로운 비밀번호로 로그인해주세요.<br />
                      보안을 위해 다른 기기에서 자동 로그아웃됩니다.
                    </div>
                  </div>
                  <button className="submit-btn" onClick={onBack}>
                    로그인하러 가기
                  </button>
                </>
              )}
            </>
          )}

          {/* 하단 링크 */}
          <div className="find-bottom">
            <span className="find-link" onClick={onBack}>로그인</span>
            <span className="find-link-divider">|</span>
            <span className="find-link">회원가입</span>
          </div>

        </div>
      </div>
    </>
  );
}
