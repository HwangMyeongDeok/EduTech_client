import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#EEF3FC] text-[#101828]">
      <Header />
      <main className="flex-1 w-full pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}