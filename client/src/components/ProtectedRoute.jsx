import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "@/hooks/useAuth";

// Blocks the page until the auth state is restored, then requires login
const ProtectedRoute = ({ children }) => {
  const { isAuthorized, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "120px 0" }}>
        <Spin size="large" />
      </div>
    );
  }
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
