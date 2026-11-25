import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquiryWidget } from "@/components/common/EnquiryWidget";
import { CookieConsent } from "@/components/common/CookieConsent";
// import { FloatingCallButton } from "@/components/layout/FloatingCallButton";
import { SEOHead } from "@/components/common/SEOHead";
import { getLenis, initLenis } from "@/lib/lenis";
import { pushPageView } from "@/lib/gtm";

export function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    initLenis();
  }, []);

  useEffect(() => {
    // Lenis drives scroll position virtually — route resets must go through it.
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Push a virtual page view to GTM on every route change.
    // 50ms delay ensures document.title has been updated by SEOHead first.
    const t = setTimeout(() => pushPageView(pathname), 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <SEOHead />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <EnquiryWidget />
      {/* <FloatingCallButton /> */}
      <FloatingCallButton />
      <CookieConsent />
    </div>
  );
}
