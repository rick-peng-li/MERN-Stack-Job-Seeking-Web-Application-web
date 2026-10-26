import { useState } from "react";
import { Card, Form, Input, Select, Button, Typography, Row, Col } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { ROLES } from "@/utils/constants";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuthorized } = useAuth();
  const { message } = useMessage();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const data = await authApi.register(values);
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
                Create a new account
              </Typography.Title>
            </div>
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item name="role" label="Register As" rules={[{ required: true, message: "Please select a role" }]}>
                <Select placeholder="Select Role" options={ROLES.map((r) => ({ value: r, label: r }))} />
              </Form.Item>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { min: 3, message: "Name must contain at least 3 characters" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Your Name" size="large" />
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
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Your Phone Number" size="large" type="number" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 8, message: "Password must contain at least 8 characters" },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Your Password" size="large" />
              </Form.Item>
              <Form.Item style={{ marginBottom: 8 }}>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                  Register
                </Button>
              </Form.Item>
              <Link to="/login">
                <Typography.Text>Already have an account? Login Now</Typography.Text>
              </Link>
            </Form>
          </Card>
        </Col>
        <Col xs={0} md={10} lg={10}>
          <img src="/register.png" alt="Register" style={{ width: "100%", borderRadius: 16 }} />
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
