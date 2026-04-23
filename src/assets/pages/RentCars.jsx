import { useState } from "react";

const NAV_LINKS = ["Become a renter", "Rental deals", "How it work", "Why choose us"];

const BRANDS = ["HONDA", "JAGUAR", "NISSAN", "VOLVO", "AUDI", "AC"];

const FEATURES = [
  {
    icon: "💰",
    title: "Best price guaranteed",
    desc: "Find a lower price? We'll refund you 100% of the difference.",
  },
  {
    icon: "🧑‍✈️",
    title: "Experience driver",
    desc: "Don't have a driver? Don't worry, we have many experienced drivers for you.",
  },
  {
    icon: "🕐",
    title: "24 hour car delivery",
    desc: "Book your car and we will deliver it directly to you in 24 hours.",
  },
  {
    icon: "🛠️",
    title: "24/7 technical support",
    desc: "Have a problem? Contact Rentcars support any time when you have a problem.",
  },
];

const CARS = [
  {
    name: "Jaguar XE L P250",
    rating: 4.8,
    seats: 4,
    transmission: "Auto",
    fuel: "Petrol",
    price: "$1,080/mo",
    color: "bg-blue-100",
    img: "🚗",
    imgColor: "#3B6DD8",
  },
  {
    name: "Audi R8",
    rating: 4.9,
    seats: 2,
    transmission: "Auto",
    fuel: "Petrol",
    price: "$2,200/mo",
    color: "bg-gray-100",
    img: "🏎️",
    imgColor: "#444",
  },
  {
    name: "BMW X5",
    rating: 4.7,
    seats: 5,
    transmission: "Auto",
    fuel: "Diesel",
    price: "$1,830/mo",
    color: "bg-sky-100",
    img: "🚙",
    imgColor: "#1A6BB5",
  },
  {
    name: "Lamborghini Huracan",
    rating: 5.0,
    seats: 2,
    transmission: "Auto",
    fuel: "Petrol",
    price: "$2,500/mo",
    color: "bg-yellow-100",
    img: "🏎️",
    imgColor: "#D4A017",
  },
];

const TESTIMONIALS = [
  {
    name: "Wilson",
    location: "Texas, US",
    rating: 5,
    text: "I am using your services for the last 6 years and I am very satisfied. The driver is always on time.",
    avatar: "W",
    avatarBg: "bg-blue-500",
  },
  {
    name: "Charlie Johnson",
    location: "New York, US",
    rating: 5,
    text: "I feel very secure when using Rentcars services. Your customer service is always excellent, and the driver is always on time.",
    avatar: "C",
    avatarBg: "bg-emerald-500",
    featured: true,
  },
];

const FOOTER_LINKS = {
  "Our Product": ["Cars", "Partners", "Features"],
  Resources: ["Blog", "Help Center", "Newsletter", "Press Center"],
  "About the Brand": ["About Us", "Our Pricing", "Our Privacy", "Terms &amp; Condition"],
  "Follow Us": [],
};

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function CarSVG({ color }) {
  return (
    <svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="110" cy="80" rx="100" ry="8" fill="rgba(0,0,0,0.08)" />
      <rect x="20" y="45" width="180" height="32" rx="8" fill={color} />
      <path d="M50 45 Q65 20 100 18 L130 18 Q165 20 175 45 Z" fill={color} />
      <rect x="18" y="55" width="184" height="16" rx="6" fill={color} />
      <circle cx="55" cy="78" r="14" fill="#222" />
      <circle cx="55" cy="78" r="8" fill="#888" />
      <circle cx="165" cy="78" r="14" fill="#222" />
      <circle cx="165" cy="78" r="8" fill="#888" />
      <rect x="60" y="24" width="40" height="20" rx="4" fill="rgba(180,220,255,0.7)" />
      <rect x="108" y="24" width="38" height="20" rx="4" fill="rgba(180,220,255,0.7)" />
      <rect x="18" y="55" width="20" height="8" rx="3" fill="#ffe066" />
      <rect x="182" y="55" width="20" height="8" rx="3" fill="#ff4444" />
    </svg>
  );
}

export default function App() {
  const [location, setLocation] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const carColors = ["#3B6DD8", "#444444", "#1A6BB5", "#D4A017"];

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-600">Rentcars</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Sign In</a>
            <a href="#" className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Sign Up
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="text-sm text-gray-700">{link}</a>
            ))}
            <a href="#" className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full text-center">Sign Up</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Find, book and<br />rent a car{" "}
                <span className="text-blue-600 italic">Easily</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-md">
                Get a car wherever and whenever you need it with your iOS and Android devices.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.27c1.3.05 2.17.63 2.97.68 1.12-.25 2.2-.97 3.44-.85 1.48.13 2.59.79 3.32 2.01-3.09 1.87-2.35 5.94.58 7.09-.36.92-.74 1.83-1.3 2.59v.01-.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div>
                    <div className="text-xs opacity-70">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.72c.28.16.6.2.91.12l12.51-7.23-2.82-2.83-10.6 9.94zm-1.86-19.7C1.12 4.37 1 4.8 1 5.27v13.46c0 .47.12.9.32 1.25l.06.06 7.53-7.53v-.18L1.38 4.96l-.06.06zm17.39 8.17l-2.67-1.54-3.07 3.07 3.07 3.07 2.68-1.55c.77-.44.77-1.17 0-1.61l-.01.02zM4.09.54L16.6 7.77l-2.82 2.82L3.18.65C3.47.5 3.81.49 4.09.54z" />
                  </svg>
                  <div>
                    <div className="text-xs opacity-70">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-blue-100 rounded-full scale-75 -rotate-6 opacity-50" />
                <div className="relative w-full" style={{ height: "280px" }}>
                  <CarSVG color="#3B6DD8" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-gray-400 uppercase tracking-wide font-medium flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Search your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs text-gray-400 uppercase tracking-wide font-medium flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pick-up date
                </label>
                <input
                  type="date"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs text-gray-400 uppercase tracking-wide font-medium flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Return date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-colors whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">HOW IT WORK</span>
            <h2 className="text-3xl font-bold mt-4 text-gray-900">Rent with following 3 working steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: "📍", title: "Choose location", desc: "Choose your pick up and drop off location" },
              { icon: "📅", title: "Pick-up date", desc: "Select your pick up date and time to book" },
              { icon: "🚘", title: "Book your car", desc: "Book your car and we will deliver it directly to you" },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 text-3xl rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-sm max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 items-center opacity-50">
            {BRANDS.map((b) => (
              <span key={b} className="text-xl sm:text-2xl font-bold tracking-widest text-gray-700 uppercase">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: "400px" }}>
                <CarSVG color="#888" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full" style={{ height: "280px", opacity: 0.9 }}>
                    <CarSVG color="#555" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">WHY CHOOSE US</span>
                <h2 className="text-3xl font-bold mt-4 text-gray-900 leading-tight">
                  We offer the best experience<br />with our rental deals
                </h2>
              </div>
              <div className="space-y-6">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">POPULAR RENTAL DEALS</span>
            <h2 className="text-3xl font-bold mt-4 text-gray-900">Most popular cars rental deals</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARS.map((car, i) => (
              <div key={car.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className={`${car.color} p-6 flex justify-center`} style={{ height: "160px" }}>
                  <CarSVG color={carColors[i]} />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 text-sm">{car.name}</h4>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-600">{car.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {car.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      {car.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      {car.fuel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-blue-600">{car.price.split("/")[0]}</span>
                      <span className="text-xs text-gray-400">/mo</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                      Rent Now
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-all inline-flex items-center gap-2">
              Show all vehicles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-0 text-9xl font-serif text-blue-100 leading-none select-none">"</div>
        <div className="absolute right-0 bottom-0 text-9xl font-serif text-blue-100 leading-none select-none rotate-180">"</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">TESTIMONIALS</span>
            <h2 className="text-3xl font-bold mt-4 text-gray-900">What people say about us?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl p-6 space-y-4 ${t.featured ? "bg-blue-600 text-white" : "bg-gray-50 border border-gray-100"}`}
              >
                <StarRating />
                <p className={`text-sm leading-relaxed ${t.featured ? "text-blue-100" : "text-gray-600"}`}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${t.featured ? "bg-blue-400" : t.avatarBg}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${t.featured ? "text-white" : "text-gray-900"}`}>{t.name}</p>
                    <p className={`text-xs ${t.featured ? "text-blue-200" : "text-gray-400"}`}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App */}
      <section className="py-16 bg-blue-600 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/4 opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 space-y-6 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest bg-blue-500 px-3 py-1 rounded-full">DOWNLOAD</span>
              <h2 className="text-4xl font-bold mt-4 leading-tight">
                Download Rentcars<br />App for{" "}
                <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded">FREE</span>
              </h2>
              <p className="text-blue-200">
                For better, faster, and exclusive rental deals.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-900 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.72c.28.16.6.2.91.12l12.51-7.23-2.82-2.83-10.6 9.94zm-1.86-19.7C1.12 4.37 1 4.8 1 5.27v13.46c0 .47.12.9.32 1.25l.06.06 7.53-7.53v-.18L1.38 4.96l-.06.06zm17.39 8.17l-2.67-1.54-3.07 3.07 3.07 3.07 2.68-1.55c.77-.44.77-1.17 0-1.61l-.01.02zM4.09.54L16.6 7.77l-2.82 2.82L3.18.65C3.47.5 3.81.49 4.09.54z" />
                  </svg>
                  <div>
                    <div className="text-xs opacity-70">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-900 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.27c1.3.05 2.17.63 2.97.68 1.12-.25 2.2-.97 3.44-.85 1.48.13 2.59.79 3.32 2.01-3.09 1.87-2.35 5.94.58 7.09-.36.92-.74 1.83-1.3 2.59v.01-.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div>
                    <div className="text-xs opacity-70">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-56 h-96 bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-gray-800 flex flex-col">
                  <div className="bg-gray-800 h-8 flex items-center justify-center">
                    <div className="w-20 h-3 bg-gray-700 rounded-full" />
                  </div>
                  <div className="flex-1 bg-blue-50 p-3 space-y-3">
                    <div className="bg-white rounded-xl p-2 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Find your car</div>
                      <div className="w-full h-24">
                        <CarSVG color="#3B6DD8" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <div className="text-xs font-bold text-blue-600">24/7</div>
                        <div className="text-xs text-gray-400">Support</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <div className="text-xs font-bold text-green-600">Free</div>
                        <div className="text-xs text-gray-400">Delivery</div>
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white text-xs rounded-lg px-3 py-2 text-center font-medium">
                      Book Now →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                </div>
                <span className="text-white font-bold">Rentcars</span>
              </div>
              <div className="text-xs space-y-1">
                <p>205 North Michigan Avenue</p>
                <p>Suite 810, Chicago, 60601</p>
                <p>+1 123-456-7890</p>
                <p>rentcars@gmail.com</p>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h5 className="text-white font-semibold text-sm">{title}</h5>
                {title === "Follow Us" ? (
                  <div className="flex gap-3">
                    {["f", "t", "in"].map((s) => (
                      <a key={s} href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-xs transition-colors text-white font-bold">
                        {s}
                      </a>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-xs hover:text-white transition-colors" dangerouslySetInnerHTML={{ __html: link }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-xs">
            <p>Copyright 2024 · Rentcars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
