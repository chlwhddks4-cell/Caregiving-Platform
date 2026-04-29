import { useState } from "react";

const POPUP_CONTENTS: Record<string, { title: string; content: string }> = {
  "회사 소개": {
    title: "회사 소개",
    content: `케어매치 (CareMatch)

케어매치는 보호자와 간병인을 안전하고 빠르게 연결하는 전문 간병인 매칭 플랫폼입니다.

■ 회사 정보
- 상호명: 코르메스
- 대표자: 홍길동
- 사업자등록번호: 465-88-03537
- 통신판매신고번호: 제2026-서울영등포-0049호
- 주소: 서울특별시 영등포구 선유로 3길 10, 허우스디 비즈 116호
- 대표전화: 1866-1004
- 팩스: 02-2679-1006

■ 서비스 비전
"모든 가족이 안심하고 맡길 수 있는 간병 서비스"를 목표로 검증된 간병인과 보호자를 연결합니다.

■ 주요 서비스
- 간병인 매칭 서비스
- 간병일지 관리
- 간병보험 청구 지원
- 동행매니저 서비스`,
  },
  "서비스 소개": {
    title: "서비스 소개",
    content: `케어매치 서비스 안내

■ 보호자 서비스
1. 간병 요청 등록
   지역, 기간, 일당 등 원하는 조건을 입력하면 조건에 맞는 간병인들이 신청합니다.

2. 신청자 확인 및 매칭
   간병인의 경력, 자격증, 자기소개를 확인하고 수락/거절할 수 있습니다.

3. 간병일지 확인
   간병인이 매일 작성하는 간병일지를 실시간으로 확인할 수 있습니다.

■ 간병인 서비스
1. 프로필 등록
   경력, 자격증, 활동 지역 등을 등록하여 보호자에게 어필하세요.

2. 일감 찾기
   전국 보호자들의 간병 요청을 확인하고 원하는 요청에 신청하세요.

3. 간병일지 작성
   매일 간병 내용을 기록하고 보호자와 공유하세요.

■ 이용 요금
현재 케어매치는 무료로 이용 가능합니다.
(추후 프리미엄 서비스 도입 예정)

■ 고객센터
- 전화: 1866-1004
- 운영시간: 월~금 09:00~22:00 / 토·일·공휴일 09:00~18:00`,
  },
  "이용약관": {
    title: "이용약관",
    content: `제1조 (목적)
이 약관은 케어매치(이하 "회사")가 제공하는 간병인 매칭 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
① "서비스"란 회사가 제공하는 간병인 매칭 플랫폼 서비스를 의미합니다.
② "이용자"란 본 약관에 따라 서비스를 이용하는 회원을 말합니다.
③ "보호자"란 간병인을 필요로 하여 간병 요청을 등록하는 이용자를 말합니다.
④ "간병인"란 간병 서비스를 제공하는 이용자를 말합니다.

제3조 (약관의 효력 및 변경)
① 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
② 회사는 합리적인 사유가 있는 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 7일이 경과한 날부터 효력이 발생합니다.

제4조 (서비스 이용)
① 이용자는 본 약관에 동의하고 회원가입을 완료한 후 서비스를 이용할 수 있습니다.
② 회사는 서비스의 품질 향상을 위해 사전 통지 없이 서비스 내용을 변경할 수 있습니다.

제5조 (이용자의 의무)
① 이용자는 관계 법령, 본 약관의 규정, 이용 안내 등을 준수하여야 합니다.
② 이용자는 타인의 정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.`,
  },
  "개인정보처리방침": {
    title: "개인정보처리방침",
    content: `케어매치(이하 "회사")는 이용자의 개인정보를 중요시하며, 개인정보보호법 등 관련 법령을 준수합니다.

1. 수집하는 개인정보 항목
- 필수항목: 아이디, 비밀번호, 이름, 휴대폰 번호, 이메일
- 선택항목: 프로필 사진, 자격증 정보, 경력 사항

2. 개인정보 수집 및 이용 목적
- 회원 가입 및 관리
- 간병인 매칭 서비스 제공
- 고객 상담 및 불만 처리
- 서비스 개선 및 신규 서비스 개발

3. 개인정보 보유 및 이용 기간
- 회원 탈퇴 시까지 보유 및 이용
- 단, 관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안 보존

4. 개인정보 제3자 제공
회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 단, 이용자의 동의가 있거나 법령에 의한 경우는 예외로 합니다.

5. 개인정보 보호책임자
- 담당자: 개인정보보호팀
- 연락처: 1866-1004`,
  },
  "이메일무단수집거부": {
    title: "이메일무단수집거부",
    content: `본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.

[정보통신망 이용촉진 및 정보보호 등에 관한 법률]

제50조의 2 (전자우편주소의 무단 수집행위 등 금지)
① 누구든지 전자우편주소의 수집을 거부하는 의사가 명시된 인터넷 홈페이지에서 자동으로 전자우편주소를 수집하는 프로그램 그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니된다.
② 누구든지 제1항의 규정을 위반하여 수집·판매 및 유통이 금지된 전자우편주소임을 알면서 이를 정보 전송에 이용하여서는 아니된다.

게시일: 2026년 1월 1일
케어매치`,
  },
};

const LINKS = [
  "회사 소개",
  "서비스 소개",
  "이용약관",
  "개인정보처리방침",
  "이메일무단수집거부",
];

export default function Footer() {
  const [popup, setPopup] = useState<{ title: string; content: string } | null>(null);

  return (
    <>
      <footer className="bg-gray-800 text-gray-400 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">

          {/* 메뉴 */}
          <div className="flex flex-wrap gap-3 md:gap-6 mb-4 text-sm justify-center md:justify-start">
            {LINKS.map((name) => (
              <span
                key={name}
                onClick={() => setPopup(POPUP_CONTENTS[name])}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {name}
              </span>
            ))}
          </div>

          {/* 정보 */}
          <div className="text-[11px] md:text-xs text-gray-500 leading-6 md:leading-7 text-center md:text-left">
            사업자명 코르메스 · 사업자등록번호 465-88-03537 · 통신판매신고번호 제2026-서울영등포-0049호
            <br />
            본사 서울특별시 영등포구 선유로 3길 10, 허우스디 비즈 116호
            <br />
            대표전화 1866-1004 · 팩스번호 02-2679-1006
          </div>

        </div>
      </footer>

      {/* 팝업 */}
      {popup && (
        <div
          onClick={() => setPopup(null)}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            {/* 헤더 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "0.5px solid #e8e6e0" }}>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{popup.title}</h3>
              <button
                onClick={() => setPopup(null)}
                style={{ background: "none", border: "none", fontSize: 20, color: "#aaa", cursor: "pointer", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {/* 내용 */}
            <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                {popup.content}
              </p>
            </div>

            {/* 하단 버튼 */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "0.5px solid #e8e6e0", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setPopup(null)}
                style={{ padding: "8px 24px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}