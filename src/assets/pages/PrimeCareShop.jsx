import { useState } from "react";

const NAV_CATEGORIES = [
  { icon: "🎁", label: "기프티콘" },
  { icon: "📱", label: "디지털/가전" },
  { icon: "🍎", label: "식품" },
  { icon: "💊", label: "건강" },
  { icon: "🛋️", label: "홈/리빙" },
];

const BANNER_ITEMS = [
  {
    id: 1,
    bg: "from-green-800 to-green-600",
    tag: "올리브오일",
    title: "쉐프 워터집 텀블러",
    img: "🫒",
    accent: "#6aaa64",
  },
  {
    id: 2,
    bg: "from-slate-700 to-slate-500",
    tag: "간편 물티슈, 향체 세제",
    title: "쿠쿠 아이런한 3.5L 가습기",
    img: "💧",
    accent: "#94a3b8",
  },
  {
    id: 3,
    bg: "from-amber-700 to-amber-500",
    tag: "건강한 일상 케어의 시작",
    title: "쿠쿠 전기 보온 밥솥",
    img: "🍚",
    accent: "#f59e0b",
  },
  {
    id: 4,
    bg: "from-teal-700 to-teal-500",
    tag: "건강식품 프리미엄",
    title: "김수자 생활건강 프리미엄 편안한 구스",
    img: "🌿",
    accent: "#14b8a6",
  },
  {
    id: 5,
    bg: "from-cyan-800 to-cyan-600",
    tag: "욕실 케어",
    title: "프리미엄 욕실용품 세트",
    img: "🚿",
    accent: "#06b6d4",
  },
];

const BEST_PRODUCTS = [
  {
    id: 1,
    badge: "BEST",
    brand: "키친아트",
    name: "키친아트 도불코팅프라이팬(리뉴얼) 1P",
    discount: 70,
    price: 20500,
    original: 67700,
    color: "bg-green-600",
    emoji: "🍳",
  },
  {
    id: 2,
    badge: "BEST",
    brand: "키친아트",
    name: "키친아트 도불코팅프라이팬(리뉴얼) 1P",
    discount: 70,
    price: 21610,
    original: 72000,
    color: "bg-amber-500",
    emoji: "🍳",
  },
  {
    id: 3,
    badge: "BEST",
    brand: "키친아트",
    name: "키친아트 도불코팅프라이팬(리뉴얼) 1P",
    discount: 70,
    price: 15760,
    original: 48100,
    color: "bg-red-500",
    emoji: "🍳",
  },
  {
    id: 4,
    badge: "BEST",
    brand: "이디야",
    name: "이디야커피 블렌드 아메리카노 커피믹스",
    discount: 67,
    price: 13400,
    original: 40600,
    color: "bg-orange-700",
    emoji: "☕",
  },
];

const SALE_PRODUCTS = [
  {
    id: 1,
    badge: "SALE",
    brand: "포스티보나",
    name: "[스페인직수입] 포스티보나 블렌드20415홍3호/볼캐모마일차20티",
    discount: 67,
    price: 15970,
    original: 49000,
    color: "bg-emerald-600",
    emoji: "🌿",
  },
  {
    id: 2,
    badge: "SALE",
    brand: "건강식품",
    name: "프리미엄 유기농 그린티 세트 30팩",
    discount: 55,
    price: 12900,
    original: 28600,
    color: "bg-teal-600",
    emoji: "🍵",
  },
  {
    id: 3,
    badge: "SALE",
    brand: "웰빙",
    name: "국내산 100% 천연 꿀 500g 선물세트",
    discount: 45,
    price: 19800,
    original: 36000,
    color: "bg-amber-600",
    emoji: "🍯",
  },
];

function formatPrice(price) {
  return price.toLocaleString("ko-KR") + "원";
}

function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div
        className={`relative ${product.color} aspect-square flex items-center justify-center text-6xl`}
      >
        <span className="drop-shadow-lg">{product.emoji}</span>
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        </div>
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow transition-transform hover:scale-110"
        >
          <span className={wished ? "text-red-500" : "text-gray-300"}>♥</span>
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-0.5">{product.brand}</p>
        <p className="text-sm text-gray-700 font-medium line-clamp-2 leading-tight mb-2">
          {product.name}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-red-500 font-bold text-sm">
            {product.discount}%
          </span>
          <span className="text-gray-900 font-bold text-base">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-gray-400 text-xs line-through mt-0.5">
          {formatPrice(product.original)}
        </p>
      </div>
    </div>
  );
}

function BannerCard({ item, active }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        active ? "ring-2 ring-green-500" : ""
      }`}
    >
      <div
        className={`bg-gradient-to-br ${item.bg} h-40 md:h-48 flex flex-col justify-end p-4`}
      >
        <div className="text-4xl mb-2">{item.img}</div>
        <p className="text-white/70 text-xs mb-1">{item.tag}</p>
        <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
      </div>
    </div>
  );
}

export default function PrimeCareShop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBanner, setActiveBanner] = useState(3);
  const [activeTab, setActiveTab] = useState("best");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-fit">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-bold text-gray-800 text-sm md:text-base whitespace-nowrap">
              Prime<span className="text-green-500">care</span>{" "}
              <span className="text-gray-400 font-normal">Shopping</span>
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="찾으시는 상품을 검색해 보세요."
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm pr-10 outline-none focus:ring-2 focus:ring-green-300 transition"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition">
              🔍
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition font-medium px-3 py-1.5 rounded-lg hover:bg-green-50">
              👤 로그인
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
              <span className="text-lg">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Category Nav */}
        <div className="border-t border-gray-50 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-green-50 hover:text-green-600 transition text-sm whitespace-nowrap text-gray-600 font-medium">
                <span>⊞</span> 카테고리
              </button>
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-green-50 hover:text-green-600 transition text-sm whitespace-nowrap text-gray-600"
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
            <button className="w-full text-left py-2 text-sm text-gray-600 border-b border-gray-50">
              👤 로그인
            </button>
            <button className="w-full text-left py-2 text-sm text-gray-600">
              🛒 장바구니 ({cartCount})
            </button>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">

        {/* ── BANNER CAROUSEL ── */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {BANNER_ITEMS.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setActiveBanner(i)}
                className={i >= 3 ? "hidden md:block" : ""}
              >
                <BannerCard item={item} active={activeBanner === i} />
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {BANNER_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeBanner === i
                    ? "w-5 h-2 bg-green-500"
                    : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ── CATEGORY ICONS ── */}
        <section>
          <div className="grid grid-cols-5 gap-2">
            {NAV_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-green-50 transition-all duration-200"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 group-hover:bg-green-100 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all duration-200 group-hover:scale-105">
                  {cat.icon}
                </div>
                <span className="text-xs md:text-sm text-gray-600 font-medium group-hover:text-green-600 transition">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── BEST / SALE TABS ── */}
        <section>
          <div className="flex gap-1 mb-5 border-b border-gray-200">
            {[
              { key: "best", label: "🏆 가장 많이 찾으시는 베스트 상품!" },
              { key: "sale", label: "🔥 할인율이 많은 상품!" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "best" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {BEST_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {activeTab === "sale" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {SALE_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {/* Placeholder cards */}
              {[4, 5, 6, 7].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <div className="bg-gray-100 aspect-square animate-pulse" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                    <div className="h-5 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={`rounded-full transition-all ${
                  i === 3 ? "w-5 h-2 bg-gray-700" : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ── SALE FEATURED PRODUCT ── */}
        <section>
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">
            🔥 할인율이 많은 상품!
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {SALE_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <div
                      className={`relative ${product.color} h-48 flex items-center justify-center text-7xl`}
                    >
                      <span className="drop-shadow-xl">{product.emoji}</span>
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          BEST
                        </span>
                        <span className="bg-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          SALE
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow">
                        인직수입
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-xs text-gray-400 mb-1">
                        {product.brand}
                      </p>
                      <p className="text-sm text-gray-700 font-medium line-clamp-2 flex-1 mb-3">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-red-500 font-bold text-base">
                              {product.discount}%
                            </span>
                            <span className="text-gray-900 font-bold text-lg">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs line-through">
                            {formatPrice(product.original)}
                          </p>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:scale-105 active:scale-95">
                          담기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Nav arrows */}
            <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition hidden md:flex">
              ‹
            </button>
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition hidden md:flex">
              ›
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <span className="w-2 h-2 rounded-full bg-gray-700" />
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-800 text-gray-400 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 text-sm mb-6 border-b border-gray-700 pb-6">
            {["회사소개", "서비스소개", "이용약관", "개인정보처리방침", "이메일무단수집거부"].map(
              (item) => (
                <button
                  key={item}
                  className="hover:text-white transition text-gray-400"
                >
                  {item}
                </button>
              )
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="space-y-1">
              <p>
                <span className="text-gray-400">사업자명</span> 코메스 &nbsp;
                <span className="text-gray-400">사업자등록번호</span>{" "}
                465-88-03537
              </p>
              <p>
                <span className="text-gray-400">통신판매신고번호</span>{" "}
                제2026-서울영등포-0049호
              </p>
              <p>
                본사 서울특별시 영등포구 선유로 3길 10, 하우스디 비즈 116호
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="text-gray-400">대표메일</span>{" "}
                primecare1004@naver.com
              </p>
              <p>
                <span className="text-gray-400">대표전화</span> 1866-1004
                &nbsp;
                <span className="text-gray-400">팩스번호</span> 02-2679-1006
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            © 2026 PrimeCare Shopping. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="grid grid-cols-4 h-14">
          {[
            { icon: "🏠", label: "홈" },
            { icon: "⊞", label: "카테고리" },
            { icon: "🔍", label: "검색" },
            { icon: "👤", label: "마이" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center gap-0.5 text-gray-500 hover:text-green-500 transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="h-14 md:hidden" />
    </div>
  );
}
