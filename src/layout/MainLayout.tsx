import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// Global scroll-reveal observer setup
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Respect stagger delays from data-delay attribute
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, parseInt(delay));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

export default function MainLayout() {
  useScrollReveal();

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