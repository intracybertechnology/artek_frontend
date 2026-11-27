import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/admin/lib/auth";
import { MainLayout } from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Products from "@/pages/Products";
import ProductCategory from "@/pages/products/ProductCategory";
import ProductDetail from "@/pages/products/ProductDetail";
import Brands from "@/pages/Brands";
import BrandDetail from "@/pages/BrandDetail";
import SolutionTemplate from "@/pages/solutions/SolutionTemplate";
import Solutions from "@/pages/Solutions";
import Locations from "@/pages/Locations";
import LocationTemplate from "@/pages/locations/LocationTemplate";
import LocationServiceTemplate from "@/pages/locations/LocationServiceTemplate";
import Industries from "@/pages/Industries";
import IndustryTemplate from "@/pages/industries/IndustryTemplate";
import Blog from "@/pages/Blog";
import BlogPostTemplate from "@/pages/blog/BlogPostTemplate";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsAndConditions from "@/pages/legal/TermsAndConditions";
import NotFound from "@/pages/NotFound";
import { AdminLayout, AdminShell, PublicOnly, RoleGuard } from "@/admin/AdminLayout";
import { LoginPage } from "@/admin/pages/LoginPage";
import { QuotesPage } from "@/admin/pages/QuotesPage";
import { ProductsPage } from "@/admin/pages/ProductsPage";

/** Sends authenticated users to their role-specific home page. */
function RoleRedirect() {
  const { role } = useAuth();
  return <Navigate to={role === "super_admin" ? "/admin/quotes" : "/admin/products"} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Admin Dashboard */}
      <Route path="admin" element={<AdminLayout />}>
        <Route path="login" element={<PublicOnly><LoginPage /></PublicOnly>} />
        <Route element={<AdminShell />}>
          {/* /admin → role-based redirect */}
          <Route index element={<RoleGuard allow={["super_admin", "admin"]}><RoleRedirect /></RoleGuard>} />
          <Route path="quotes" element={<RoleGuard allow={["super_admin"]}><QuotesPage /></RoleGuard>} />
          <Route path="products" element={<RoleGuard allow={["super_admin", "admin"]}><ProductsPage /></RoleGuard>} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Public Marketing Website */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cctvservicesindubai" element={<Contact />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:group" element={<ProductCategory />} />
        <Route path="products/:group/:product" element={<ProductDetail />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:brand" element={<BrandDetail />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:slug" element={<SolutionTemplate />} />
        <Route path="locations" element={<Locations />} />
        <Route path="locations/:emirate" element={<LocationTemplate />} />
        <Route path="locations/:emirate/:service" element={<LocationServiceTemplate />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryTemplate />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPostTemplate />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
