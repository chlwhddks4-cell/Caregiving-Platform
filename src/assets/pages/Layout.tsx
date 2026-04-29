// Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      <Navbar /> {/* 항상 고정 */}

      <main className="flex-1">
        <Outlet /> {/* 페이지 내용 */}
      </main>

      <Footer /> {/* 항상 고정 */}

    </div>
  );
}