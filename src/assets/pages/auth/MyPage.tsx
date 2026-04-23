import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import './MyPage.css';

const MENUS = [
  { key: 'info', icon: '👤', label: '내 정보' },
  { key: 'activity', icon: '📋', label: '활동 내역' },
  { key: 'password', icon: '🔒', label: '비밀번호 변경' },
  { key: 'notification', icon: '🔔', label: '알림 설정' },
];

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '홍길동',
    phone: '010-1234-5678',
    email: 'hong@naver.com',
  });
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [toggles, setToggles] = useState({
    sms: true, email: false, push: true
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveInfo = () => {
    alert('정보가 수정되었습니다.');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!pwForm.current) return alert('현재 비밀번호를 입력해주세요.');
    if (pwForm.next !== pwForm.confirm) return alert('새 비밀번호가 일치하지 않습니다.');
    alert('비밀번호가 변경되었습니다.');
    setPwForm({ current: '', next: '', confirm: '' });
  };

  return (
    <>
      
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
                {user?.role === 'caregiver' ? '🧑‍⚕️ 간병인' : '👨‍👩‍👧 보호자'}
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
                    { label: '이름', key: 'name', value: editForm.name },
                    { label: '휴대폰', key: 'phone', value: editForm.phone },
                    { label: '이메일', key: 'email', value: editForm.email },
                    { label: '역할', key: 'role', value: user?.role === 'caregiver' ? '간병인' : '보호자' },
                  ].map(({ label, key, value }) => (
                    <div className="info-item" key={key}>
                      <span className="info-label">{label}</span>
                      {isEditing && key !== 'role' ? (
                        <input
                          className="edit-input"
                          value={value}
                          onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
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
                      <button className="btn-outline" onClick={() => setIsEditing(false)}>취소</button>
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

            {/* 회원 탈퇴 - 항상 표시 */}
            <div className="content-card">
              <div className="danger-section">
                <div>
                  <div className="danger-title">회원 탈퇴</div>
                  <div className="danger-desc">탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.</div>
                </div>
                <button className="btn-danger" onClick={() => confirm('정말 탈퇴하시겠습니까?')}>
                  탈퇴하기
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
