import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "@/hooks/useAuth";

// Login / register pages: redirect to home when already authorized
const GuestRoute = ({ children }) => {
  const { isAuthorized, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "120px 0" }}>
        <Spin size="large" />
      </div>
    );
  }
  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default GuestRoute;
