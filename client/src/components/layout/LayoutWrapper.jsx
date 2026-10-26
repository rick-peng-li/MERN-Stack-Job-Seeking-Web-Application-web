import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";

const { Content } = Layout;

// App shell: navbar is shown only after login
const LayoutWrapper = () => {
  const { isAuthorized } = useAuth();
  const { pathname } = useLocation();
  const is404 = ![
    "/",
    "/login",
    "/register",
    "/job/getall",
    "/job/post",
    "/job/me",
    "/applications/me",
  ].some((path) => pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)));

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {isAuthorized && !is404 && <Navbar />}
      <Content>
        <Outlet />
      </Content>
      {isAuthorized && !is404 && <Footer />}
    </Layout>
  );
};

export default LayoutWrapper;
