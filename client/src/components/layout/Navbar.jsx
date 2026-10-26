import { Layout, Menu, Button, Avatar, Typography } from "antd";
import {
  HomeOutlined,
  ApartmentOutlined,
  FileDoneOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { authApi } from "@/api/authApi";

const { Header } = Layout;

const Navbar = () => {
  const { user, setIsAuthorized } = useAuth();
  const { message } = useMessage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      const data = await authApi.logout();
      setIsAuthorized(false);
      message.success(data.message);
      navigate("/login");
    } catch (error) {
      message.error(error.message);
    }
  };

  const items = [
    { key: "/", icon: <HomeOutlined />, label: <Link to="/">HOME</Link> },
    { key: "/job/getall", icon: <ApartmentOutlined />, label: <Link to="/job/getall">ALL JOBS</Link> },
    {
      key: "/applications/me",
      icon: <FileDoneOutlined />,
      label: (
        <Link to="/applications/me">
          {user?.role === "Employer" ? "APPLICANTS' APPLICATIONS" : "MY APPLICATIONS"}
        </Link>
      ),
    },
    ...(user?.role === "Employer"
      ? [
          {
            key: "/job/post",
            icon: <PlusCircleOutlined />,
            label: <Link to="/job/post">POST NEW JOB</Link>,
          },
          {
            key: "/job/me",
            icon: <UnorderedListOutlined />,
            label: <Link to="/job/me">VIEW YOUR JOBS</Link>,
          },
        ]
      : []),
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        paddingInline: 24,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
        <Link to="/">
          <img src="/JobZee-logos__white.png" alt="JobZee" style={{ height: 40, objectFit: "contain" }} />
        </Link>
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={items}
          style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Typography.Text strong>{user?.name}</Typography.Text>
        <Avatar style={{ backgroundColor: "#2563eb" }}>{user?.name?.[0]?.toUpperCase()}</Avatar>
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
