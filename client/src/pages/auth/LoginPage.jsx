import { useState } from "react";
import { Card, Form, Input, Select, Button, Typography, Row, Col } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { ROLES } from "@/utils/constants";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuthorized } = useAuth();
  const { message } = useMessage();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const data = await authApi.login(values);
      setIsAuthorized(true);
      message.success(data.message);
      navigate("/");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center", padding: 24 }}>
      <Row gutter={[48, 32]} align="middle" justify="center" style={{ width: "100%" }}>
        <Col xs={24} md={10} lg={8}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <img src="/JobZeelogo.png" alt="JobZee" style={{ height: 48 }} />
              <Typography.Title level={3} style={{ marginTop: 12, marginBottom: 0 }}>
                Login to your account
              </Typography.Title>
            </div>
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item name="role" label="Login As" rules={[{ required: true, message: "Please select a role" }]}>
                <Select placeholder="Select Role" options={ROLES.map((r) => ({ value: r, label: r }))} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="you@example.com" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Your Password" size="large" />
              </Form.Item>
              <Form.Item style={{ marginBottom: 8 }}>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                  Login
                </Button>
              </Form.Item>
              <Link to="/register">
                <Typography.Text>Don't have an account? Register Now</Typography.Text>
              </Link>
            </Form>
            <Typography.Paragraph type="secondary" style={{ marginTop: 16, marginBottom: 0, fontSize: 12 }}>
              Demo accounts: employer@jobzee.com / seeker@jobzee.com (Password123)
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={0} md={10} lg={10}>
          <img src="/login.png" alt="Login" style={{ width: "100%", borderRadius: 16 }} />
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
