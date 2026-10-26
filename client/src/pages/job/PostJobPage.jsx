import { useState } from "react";
import { Card, Form, Input, Select, InputNumber, Radio, Button, Typography, Row, Col } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import { jobApi } from "@/api/jobApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { CATEGORIES } from "@/utils/constants";

const PostJobPage = () => {
  const [loading, setLoading] = useState(false);
  const [salaryType, setSalaryType] = useState("ranged");
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { message } = useMessage();
  const navigate = useNavigate();

  if (user?.role !== "Employer") {
    return <Navigate to="/" replace />;
  }

  const handlePostJob = async (values) => {
    setLoading(true);
    const payload =
      salaryType === "fixed"
        ? { ...values, fixedSalary: values.fixedSalary, salaryFrom: undefined, salaryTo: undefined }
        : { ...values, salaryFrom: values.salaryFrom, salaryTo: values.salaryTo, fixedSalary: undefined };
    try {
      const data = await jobApi.create(payload);
      message.success(data.message);
      form.resetFields();
      navigate("/job/me");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: 24 }}>
      <Card>
        <Typography.Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          POST NEW JOB
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={handlePostJob}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="title" label="Job Title" rules={[{ required: true, message: "Please enter the job title" }]}>
                <Input placeholder="e.g. Senior React Developer" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
                <Select
                  placeholder="Select Category"
                  size="large"
                  options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="country" label="Country" rules={[{ required: true, message: "Please enter the country" }]}>
                <Input placeholder="Country" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="city" label="City" rules={[{ required: true, message: "Please enter the city" }]}>
                <Input placeholder="City" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              { required: true, message: "Please enter the location" },
              { min: 20, message: "Location must contain at least 20 characters" },
            ]}
          >
            <Input placeholder="Street address, e.g. 5th Avenue 120, New York, USA" size="large" />
          </Form.Item>
          <Form.Item label="Salary Type" required>
            <Radio.Group
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              optionType="button"
              buttonStyle="solid"
              options={[
                { value: "fixed", label: "Fixed Salary" },
                { value: "ranged", label: "Ranged Salary" },
              ]}
            />
          </Form.Item>
          {salaryType === "fixed" ? (
            <Form.Item
              name="fixedSalary"
              label="Fixed Salary (USD / year)"
              rules={[{ required: true, message: "Please enter the fixed salary" }]}
            >
              <InputNumber min={1000} max={999999999} style={{ width: "100%" }} placeholder="e.g. 85000" size="large" />
            </Form.Item>
          ) : (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="salaryFrom"
                  label="Salary From (USD / year)"
                  rules={[{ required: true, message: "Please enter the range start" }]}
                >
                  <InputNumber min={1000} max={999999999} style={{ width: "100%" }} placeholder="e.g. 50000" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="salaryTo"
                  label="Salary To (USD / year)"
                  rules={[{ required: true, message: "Please enter the range end" }]}
                >
                  <InputNumber min={1000} max={999999999} style={{ width: "100%" }} placeholder="e.g. 90000" size="large" />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Form.Item
            name="description"
            label="Job Description"
            rules={[
              { required: true, message: "Please enter the description" },
              { min: 30, message: "Description must contain at least 30 characters" },
            ]}
          >
            <Input.TextArea rows={6} placeholder="Describe the role, responsibilities and requirements..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading}>
            Create Job
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PostJobPage;
