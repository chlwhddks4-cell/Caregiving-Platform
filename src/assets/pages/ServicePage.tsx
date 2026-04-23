export default function ServicePage() {
  return (
    <div className="bg-gray-50">

      {/* 상단 배너 */}
      <section className="relative h-[260px] md:h-[340px] flex items-center justify-center text-white">
        <img
          src="/banner.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="relative text-2xl md:text-4xl font-bold">
          서비스 소개
        </h1>
      </section>

      {/* 소개 텍스트 */}
      <section className="max-w-6xl mx-auto px-4 py-10 text-center">
        <p className="text-sm text-gray-400 mb-2">주요 서비스</p>
        <h2 className="text-lg md:text-2xl font-bold mb-4">
          돌봄의 시작부터 끝까지, 한 번에 빠르게!
          <br />
          프라임케어 하나면 충분합니다.
        </h2>
        <p className="text-gray-500 text-sm">
          프라임케어는 간병을 중심으로 출발해, 돌봄 전 과정을 하나로 확장해 나가는 올인원 통합 플랫폼입니다.
        </p>
      </section>

      {/* 서비스 리스트 */}
      <section className="max-w-6xl mx-auto px-4 space-y-16 pb-16">

        <ServiceItem
          title="간병인 맞춤 매칭 서비스"
          desc={[
            "환자 상태에 맞는 최적화된 간병인 추천 프로그램",
            "고객이 직접 선택하는 투명한 매칭 구조",
            "매칭 시작 이후에도 철저한 관리",
            "365일 상담 서비스 제공",
          ]}
          img="/img1.jpg"
        />

        <ServiceItem
          reverse
          title="병원 동행 매니저 서비스"
          desc={[
            "병원 방문, 검사, 외출 시 보호자를 대신하는 서비스",
            "접수 및 진료 안내",
            "병원 이동 및 동행",
            "보호자 부재 시 안전 동행",
          ]}
          img="/img2.jpg"
        />

        <ServiceItem
          title="프라임 키즈 케어 서비스"
          desc={[
            "아이 돌봄 및 교육 케어",
            "맞춤형 프로그램 제공",
            "안전 관리 및 케어",
          ]}
          img="/img3.jpg"
        />

        <ServiceItem
          reverse
          title="프라임캐시 포인트샵"
          desc={[
            "포인트로 다양한 상품 구매",
            "이벤트 및 리워드 제공",
          ]}
          img="/img4.jpg"
        />

        <ServiceItem
          title="365 실시간 고객지원"
          desc={[
            "365일 고객센터 운영",
            "상담 및 문의 지원",
          ]}
          img="/img5.jpg"
        />

      </section>

      {/* 하단 CTA */}
      <section className="relative h-[200px] md:h-[300px] flex items-center">
        <img
          src="/bottom.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-6xl mx-auto px-4 text-white text-lg md:text-2xl font-bold">
          단순한 매칭 플랫폼이 아닌,<br />
          간병의 시작부터 끝까지<br />
          함께하는 파트너가 되겠습니다.
        </div>
      </section>

    </div>
  );
}

type Props = {
  title: string;
  desc: string[];
  img: string;
  reverse?: boolean;
};

function ServiceItem({ title, desc, img, reverse }: Props) {
  return (
    <div
      className={`
        flex flex-col md:flex-row items-center gap-6
        ${reverse ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* 이미지 */}
      <div className="w-full md:w-1/2">
        <img
          src={img}
          className="w-full h-[200px] md:h-[260px] object-cover rounded-xl"
        />
      </div>

      {/* 텍스트 */}
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          {desc.map((d, i) => (
            <li key={i}>• {d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}