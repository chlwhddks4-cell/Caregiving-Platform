import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import MyRequestList from "./MyRequestList.tsx";
import MyApplyList from "./MyApplyList";

import { Modal, useModal } from "../components/Modal.tsx";


import axios from 'axios';

import './MyPage.css';

import { REGIONS } from "../../data/regions";


export default function MyPage() {
  const { modal, showAlert, showConfirm } = useModal();
  const navigate = useNavigate();
  const { login,  user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name ,
    phone: user?.phone,
    email: user?.email
  });
  

  const MENUS = [
  { key: 'info', icon: '👤', label: '내 정보' },
  // { key: 'activity', icon: '📋', label: '활동 내역' },
  // 간병인만 보임
  ...(user?.role === 'caregiver'|| user?.role === 'admin' ? [
    { key: 'profile', icon: '🧑‍⚕️', label: '간병인 프로필' },
    { key: 'myApply', icon: '📝', label: '내 신청 현황' },
  ] : []),
  // 보호자만 보임
  ...(user?.role === 'guardian'  || user?.role === 'admin'  ? [
    { key: 'myRequest', icon: '📋', label: '내 요청 목록' },
  ] : []),
  { key: 'password', icon: '🔒', label: '비밀번호 변경' },
  { key: 'notification', icon: '🔔', label: '알림 설정' },
];
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [toggles, setToggles] = useState({
    sms: true, email: false, push: true
  });

  const [profileForm, setProfileForm] = useState({
  careerYears: '',
  certificates: '',
   city: '서울특별시',      // 추가
  district: '강남구',      // 추가
  intro: '',
});

const [originalForm, setOriginalForm] = useState({
  name: user?.name ,
  phone: user?.phone,
  email: user?.email
});

const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 취소 버튼 클릭 시 원본으로 복구
const handleCancelInfo = () => {
  setEditForm({ ...originalForm }); // 백업 값으로 복구
  setIsEditing(false);
};

  // 내정보 수정 
  const handleSaveInfo = async () => {

     const ok = await showConfirm("내 정보 수정", "정보 수정 하시겠습니까?");
      if (!ok) return;

      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/update-user`, {
          user_id: user?.id,
          name: editForm.name,
          phone: editForm.phone,
          email: editForm.email,
        });

        // AuthContext user 정보도 업데이트
        login({
          ...user,
          name: editForm.name,
        }, localStorage.getItem('token') || '');

         await showAlert("수정 완료", "정보가 수정되었습니다.", "success");
        setIsEditing(false);

      } catch (err) {
        alert('수정 실패');
        console.error(err);
      }
};

  const handleChangePassword = async () => {

      if (!pwForm.current) {
        await showAlert("", "현재 비밀번호를 입력해주세요.", "success")
        return ;
      }
      if (!pwForm.next)  { 
        await showAlert("", "새 비밀번호를 입력해주세요.", "success")
        return ;
      }
      
      if (pwForm.next.length < 8)  { 
        await showAlert("", "새 비밀번호는 8자 이상이어야 합니다.", "success")
        return ;
      }
      if (pwForm.next !== pwForm.confirm) {
        await showAlert("", "새 비밀번호가 일치하지 않습니다.", "success")
        return ;
      }

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/change-password`,
          {
            user_id: user?.id,
            currentPassword: pwForm.current,
            newPassword: pwForm.next,
          }
        );

        if (res.data.success) {
          
          await showAlert("수정 완료", "비밀번호가 변경되었습니다.", "success");
          setPwForm({ current: '', next: '', confirm: '' });
        }
      } catch (err: any) {
        alert(err.response?.data?.message || '변경 실패');
        console.error(err);
      }
  };

///// 저장 버튼 
  const handleSaveProfile = async () => {

    
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/caregiver-profile`, {
            user_id: user?.id,
            careerYears: profileForm.careerYears,
            certificates: profileForm.certificates,
            city: profileForm.city,
            district: profileForm.district,
            intro: profileForm.intro,
          });

          if (res.data.success) {
            alert('프로필이 저장되었습니다.');
            setIsEditingProfile(false);
          }
        } catch (err) {
          alert('저장 실패');
          console.error(err);
        }
};

const handleWithdraw = async () => {

  const ok = await showConfirm("회원 탈퇴", "정말 탈퇴하시겠습니까?");
  
    if (!ok) return;
  

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/withdraw`, {
      data: { user_id: user?.id }
    });

    alert('회원 탈퇴가 완료되었습니다.');
    logout();
    navigate('/');

  } catch (err) {
    alert('탈퇴 실패');
    console.error(err);
  }
};

useEffect(() => {
  if (user?.id) {
    setEditForm({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
    });
    setOriginalForm({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
    });
  }
}, [user]);

useEffect(() => {  //간병인 프로필 정보 조회 
  if (user?.id && activeMenu === 'profile') {
    axios.get(`${import.meta.env.VITE_API_URL}/caregiver-profile/${user.id}`)
      .then((res) => {
        if (res.data.success) {
          const result = res.data.data;
          setProfileForm({
            careerYears: result.career_years || '',
            certificates: result.certificates || '',
            city: result.city,
            district: result.district ,
            intro: result.intro || '',
          });
          
        }
      });
  }
}, [activeMenu]);

  return (
    <>
       <Modal {...modal} />
      <div className="mypage-wrap">
        <div className="mypage-inner">

          {/* 사이드바 */}
          <div className="sidebar">
            <div className="profile-section">
              <div className="profile-avatar">
                👤
                <div className="profile-avatar-edit">변경</div>
              </div>
              <div className="profile-name">{user?.name || '홍길동'} 님</div>
              <div className="profile-role">
                    {user?.role === 'caregiver' 
                      ? '🧑‍⚕️ 간병인' 
                      : user?.role === 'admin' 
                        ? '👑 관리자' 
                        : '👨‍👩‍👧 보호자'}
              </div>
            </div>

            <div className="side-menu">
              {MENUS.map((menu) => (
                <div
                  key={menu.key}
                  className={`side-menu-item ${activeMenu === menu.key ? 'active' : ''}`}
                  onClick={() => setActiveMenu(menu.key)}
                >
                  <span className="side-menu-icon">{menu.icon}</span>
                  {menu.label}
                </div>
              ))}
              <div className="side-menu-divider" />
              <div className="side-logout" onClick={handleLogout}>
                <span className="side-menu-icon">🚪</span>
                로그아웃
              </div>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="content-area">

            {/* 내 정보 */}
            {activeMenu === 'info' && (
              <div className="content-card">
                <div className="card-title">👤 내 정보</div>

               <div className="info-grid">
                  {[
                     { label: '아이디', key: 'id', value: user?.id },    
                    { label: '이름', key: 'name', value: editForm.name },
                    { label: '휴대폰', key: 'phone', value: editForm.phone },
                    { label: '이메일', key: 'email', value: editForm.email },
                    { label: '역할', key: 'role', value: user?.role === 'caregiver' ? '간병인' : user?.role === 'admin' ? '관리자' : '보호자' },
                  ].map(({ label, key, value }) => (
                    <div className="info-item" key={key}>
                      <span className="info-label">{label}</span>
                      {isEditing && key !== 'role'   && key !== 'id' ? ( 
                        <input
                          className="edit-input"
                          value={value}
                          maxLength={key === 'phone' ? 13 : undefined}
                          onChange={(e) => {
                            if (key === 'phone') {
                              const onlyNum = e.target.value.replace(/[^0-9]/g, '');
                              let formatted = onlyNum;
                              if (onlyNum.length <= 3) {
                                formatted = onlyNum;
                              } else if (onlyNum.length <= 7) {
                                formatted = `${onlyNum.slice(0,3)}-${onlyNum.slice(3)}`;
                              } else {
                                formatted = `${onlyNum.slice(0,3)}-${onlyNum.slice(3,7)}-${onlyNum.slice(7,11)}`;
                              }
                              setEditForm({ ...editForm, phone: formatted });
                            } else {
                              setEditForm({ ...editForm, [key]: e.target.value });
                            }
                          }}
                        />
                      ) : (
                        <div className="info-value">{value}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="btn-group">
                  {isEditing ? (
                    <>
                      <button className="btn-outline" onClick={handleCancelInfo }>취소</button>
                      <button className="btn-primary" onClick={handleSaveInfo}>저장</button>
                    </>
                  ) : (
                    <button className="btn-primary" onClick={() => setIsEditing(true)}>✏️ 정보 수정</button>
                  )}
                </div>
              </div>
            )}

            {/* 활동 내역 */}
            {activeMenu === 'activity' && (
              <div className="content-card">
                <div className="card-title">📋 활동 내역</div>

                <div className="stats-grid">
                  {[
                    { value: '3', label: '진행중' },
                    { value: '12', label: '완료' },
                    { value: '4.8', label: '평균 평점' },
                  ].map(({ value, label }) => (
                    <div className="stat-card" key={label}>
                      <div className="stat-value">{value}</div>
                      <div className="stat-label">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="activity-list">
                  {[
                    { icon: '🏥', title: '김○○ 환자 간병', date: '2026.04.01 ~ 진행중', status: 'active', statusText: '진행중' },
                    { icon: '🏠', title: '이○○ 환자 간병', date: '2026.03.01 ~ 2026.03.31', status: 'done', statusText: '완료' },
                    { icon: '🏥', title: '박○○ 환자 간병', date: '2026.02.15 ~ 2026.02.28', status: 'done', statusText: '완료' },
                    { icon: '⏳', title: '최○○ 환자 간병', date: '2026.05.01 예정', status: 'pending', statusText: '예정' },
                  ].map((item, i) => (
                    <div className="activity-item" key={i}>
                      <div className="activity-icon">{item.icon}</div>
                      <div className="activity-info">
                        <div className="activity-title">{item.title}</div>
                        <div className="activity-date">{item.date}</div>
                      </div>
                      <span className={`activity-status status-${item.status}`}>
                        {item.statusText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 비밀번호 변경 */}
            {activeMenu === 'password' && (
              <div className="content-card">
                <div className="card-title">🔒 비밀번호 변경</div>
                <div className="password-section">
                  {[
                    { label: '현재 비밀번호', key: 'current', placeholder: '현재 비밀번호 입력' },
                    { label: '새 비밀번호', key: 'next', placeholder: '8자 이상, 영문+숫자+특수문자' },
                    { label: '새 비밀번호 확인', key: 'confirm', placeholder: '새 비밀번호 재입력' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <span className="field-label">{label}</span>
                      <input
                        className="edit-input"
                        type="password"
                        placeholder={placeholder}
                        value={pwForm[key as keyof typeof pwForm]}
                        onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
                <div className="btn-group">
                  <button className="btn-primary" onClick={handleChangePassword}>비밀번호 변경</button>
                </div>
              </div>
            )}

            

            {/* 알림 설정 */}
            {activeMenu === 'notification' && (
              <div className="content-card">
                <div className="card-title">🔔 알림 설정</div>
                <div className="toggle-list">
                  {[
                    { key: 'sms', title: 'SMS 알림', desc: '간병 신청/수락/취소 문자 알림' },
                    { key: 'email', title: '이메일 알림', desc: '주요 활동 이메일 수신' },
                    { key: 'push', title: '푸시 알림', desc: '앱 푸시 알림 수신' },
                  ].map(({ key, title, desc }) => (
                    <div className="toggle-item" key={key}>
                      <div className="toggle-info">
                        <div className="toggle-title">{title}</div>
                        <div className="toggle-desc">{desc}</div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={toggles[key as keyof typeof toggles]}
                          onChange={(e) => setToggles({ ...toggles, [key]: e.target.checked })}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

        {/* 내 요청 목록 - 보호자용 */}
            {activeMenu === 'myRequest' && (
              <div className="content-card">
                <div className="card-title">📋 내 요청 목록</div>
                <MyRequestList />
              </div>
            )}

         {/* 간병인 프로필 */}
              {activeMenu === 'profile' && (
                <div className="content-card">
                  <div className="card-title">🧑‍⚕️ 간병인 프로필</div>

                  {user?.role !== 'caregiver' ? (
                    <div style={{ textAlign: "center", padding: "2rem", color: "#aaa", fontSize: 14 }}>
                      간병인 회원만 프로필을 등록할 수 있습니다.
                    </div>
                  ) : (
                    <>
                      <div className="info-grid" style={{ rowGap: 20 }}>
                        <div className="info-item">
                          <span className="info-label">경력 년수</span>
                          {isEditingProfile ? (
                            <input
                              className="edit-input"
                              type="number"
                              placeholder="예) 3"
                              value={profileForm.careerYears}
                              onChange={(e) => setProfileForm({ ...profileForm, careerYears: e.target.value })}
                            />
                          ) : (
                            <div className="info-value">{profileForm.careerYears ? `${profileForm.careerYears}년` : '미입력'}</div>
                          )}
                        </div>

                        <div className="info-item">
                          <span className="info-label">자격증</span>
                          {isEditingProfile ? (
                            <input
                              className="edit-input"
                              placeholder="예) 요양보호사 1급, 간호조무사"
                              value={profileForm.certificates}
                              onChange={(e) => setProfileForm({ ...profileForm, certificates: e.target.value })}
                            />
                          ) : (
                            <div className="info-value">{profileForm.certificates || '미입력'}</div>
                          )}
                        </div>
                      </div>

                      {/* 활동 지역 */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, marginTop: 20 }}>
                        <div className="info-item">
                          <span className="info-label">활동 지역 (시/도)</span>
                          {isEditingProfile ? (
                            <select
                              className="edit-input"
                              value={profileForm.city}
                              onChange={(e) => {
                                setProfileForm({ 
                                  ...profileForm, 
                                  city: e.target.value, 
                                  district: REGIONS[e.target.value][0] 
                                });
                              }}
                            >
                              {Object.keys(REGIONS).map((c) => <option key={c}>{c}</option>)}
                            </select>
                          ) : (
                            <div className="info-value">{profileForm.city || '미입력'}</div>
                          )}
                        </div>

                        <div className="info-item">
                          <span className="info-label">활동 지역 (구/군)</span>
                          {isEditingProfile ? (
                            <select
                              className="edit-input"
                              value={profileForm.district}
                              onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                            >
                              {REGIONS[profileForm.city]?.map((d) => <option key={d}>{d}</option>)}
                            </select>
                          ) : (
                            <div className="info-value">{profileForm.district || '미입력'}</div>
                          )}
                        </div>
                      </div>

                      {/* 자기소개 */}
                      <div className="info-item" style={{ marginTop: 20 }}>
                        <span className="info-label">자기소개</span>
                        {isEditingProfile ? (
                          <textarea
                            className="edit-input"
                            placeholder="경력, 특기, 간병 철학 등을 소개해주세요."
                            value={profileForm.intro}
                            onChange={(e) => setProfileForm({ ...profileForm, intro: e.target.value })}
                            style={{ height: 120, resize: "vertical" }}
                          />
                        ) : (
                          <div className="info-value" style={{ whiteSpace: "pre-line" }}>
                            {profileForm.intro || '미입력'}
                          </div>
                        )}
                      </div>

                      <div className="btn-group" style={{ marginTop: 20 }}>
                        {isEditingProfile ? (
                          <>
                            <button className="btn-outline" onClick={() => setIsEditingProfile(false)}>취소</button>
                            <button className="btn-primary" onClick={() => { handleSaveProfile(); setIsEditingProfile(false); }}>저장</button>
                          </>
                        ) : (
                          <button className="btn-primary" onClick={() => setIsEditingProfile(true)}>✏️ 프로필 수정</button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeMenu === 'myApply' && (
                <div className="content-card">
                  <div className="card-title">📝 내 신청 현황</div>
                  <MyApplyList />
                </div>
              )}

           {/* 회원 탈퇴 - 내 정보 탭에서만 표시 */}
            {activeMenu === 'info' && (
              <div className="content-card">
                <div className="danger-section">
                  <div>
                    <div className="danger-title">회원 탈퇴</div>
                    <div className="danger-desc">탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.</div>
                  </div>
                  <button className="btn-danger" onClick={() => handleWithdraw()}>
                    탈퇴하기
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
