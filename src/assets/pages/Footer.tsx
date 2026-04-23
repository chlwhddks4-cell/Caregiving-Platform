

export default function Footer() {
    
  return (
    <footer className="bg-gray-800 text-gray-400 px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* 메뉴 */}
        <div className="flex flex-wrap gap-3 md:gap-6 mb-4 text-sm justify-center md:justify-start">
          {[
            "회사 소개",
            "서비스 소개",
            "이용약관",
            "개인정보처리방침",
            "이메일무단수집거부",
          ].map((l) => (
            <a
              key={l}
              href="#"
              className="hover:text-white transition-colors"
            >
              {l}
            </a>
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
  );
}