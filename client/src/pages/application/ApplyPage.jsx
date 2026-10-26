import { useState } from "react";
import { Card, Form, Input, Button, Upload, Typography } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { applicationApi } from "@/api/applicationApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { message } = useMessage();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  if (user?.role !== "Job Seeker") {
    return <Navigate to="/" replace />;
  }

  const handleApply = async (values) => {
    if (!fileList.length) {
      message.error("Please upload your resume!");
      return;
    }
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    formData.append("resume", fileList[0].originFileObj);
    formData.append("jobId", id);

    setLoading(true);
    try {
      const data = await applicationApi.apply(formData);
      message.success(data.message);
      navigate("/job/getall");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <Card>
        <Typography.Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Application Form
        </Typography.Title>
        <Form layout="vertical" onFinish={handleApply}>
          <Form.Item name="name" label="Your Name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Your Name" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Your Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" size="large" />
          </Form.Item>
          <Form.Item name="phone" label="Your Phone Number" rules={[{ required: true, message: "Please enter your phone number" }]}>
            <Input type="number" placeholder="Your Phone Number" size="large" />
          </Form.Item>
          <Form.Item name="address" label="Your Address" rules={[{ required: true, message: "Please enter your address" }]}>
            <Input placeholder="Your Address" size="large" />
          </Form.Item>
          <Form.Item name="coverLetter" label="Cover Letter" rules={[{ required: true, message: "Please write a cover letter" }]}>
            <Input.TextArea rows={5} placeholder="Tell the employer why you are a great fit..." />
          </Form.Item>
          <Form.Item label="Select Resume (PNG / JPG / WEBP)" required>
            <Upload.Dragger
              accept="image/png,image/jpeg,image/webp"
              maxCount={1}
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList: fl }) => setFileList(fl)}
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Click or drag your resume image here</p>
            </Upload.Dragger>
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading} icon={<UploadOutlined />}>
            Send Application
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ApplyPage;
