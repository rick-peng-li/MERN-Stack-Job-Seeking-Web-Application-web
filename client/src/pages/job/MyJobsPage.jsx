import { useCallback, useEffect, useState } from "react";
import { Card, List, Button, Tag, Popconfirm, Modal, Form, Input, Select, InputNumber, Radio, Typography, Spin, Empty, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import { jobApi } from "@/api/jobApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { CATEGORIES, formatSalary } from "@/utils/constants";

const SalaryFields = ({ salaryType }) =>
  salaryType === "fixed" ? (
    <Form.Item name="fixedSalary" label="Fixed Salary" rules={[{ required: true, message: "Required" }]}>
      <InputNumber min={1000} max={999999999} style={{ width: "100%" }} />
    </Form.Item>
  ) : (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="salaryFrom" label="Salary From" rules={[{ required: true, message: "Required" }]}>
          <InputNumber min={1000} max={999999999} style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="salaryTo" label="Salary To" rules={[{ required: true, message: "Required" }]}>
          <InputNumber min={1000} max={999999999} style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>
  );

const MyJobsPage = () => {
  const { user } = useAuth();
  const { message } = useMessage();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const salaryType = Form.useWatch("salaryType", form);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await jobApi.getMine();
      setJobs(data.myJobs);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (user?.role !== "Employer") {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (id) => {
    try {
      const data = await jobApi.remove(id);
      message.success(data.message);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      message.error(error.message);
    }
  };

  const openEdit = (job) => {
    setEditingJob(job);
    form.setFieldsValue({
      title: job.title,
      category: job.category,
      country: job.country,
      city: job.city,
      location: job.location,
      description: job.description,
      ...(job.fixedSalary
        ? { salaryType: "fixed", fixedSalary: job.fixedSalary }
        : { salaryType: "ranged", salaryFrom: job.salaryFrom, salaryTo: job.salaryTo }),
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const payload =
        values.salaryType === "fixed"
          ? { ...values, fixedSalary: values.fixedSalary }
          : { ...values, salaryFrom: values.salaryFrom, salaryTo: values.salaryTo };
      delete payload.salaryType;
      const data = await jobApi.update(editingJob._id, payload);
      message.success(data.message);
      setEditingJob(null);
      fetchJobs();
    } catch (error) {
      if (error?.errorFields) return; // form validation error
      message.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Jobs Posted By You
      </Typography.Title>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <Spin size="large" />
        </div>
      ) : jobs.length === 0 ? (
        <Empty description="No Jobs Posted Yet" />
      ) : (
        <List
          grid={{ gutter: 24, column: 1 }}
          dataSource={jobs}
          renderItem={(job) => (
            <List.Item>
              <Card
                title={job.title}
                extra={<Tag color="blue">{job.category}</Tag>}
                actions={[
                  <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => openEdit(job)}>
                    Edit
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="Delete this job?"
                    onConfirm={() => handleDelete(job._id)}
                  >
                    <Button type="link" danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Typography.Paragraph type="secondary" style={{ marginBottom: 4 }}>
                  <EnvironmentOutlined /> {job.city}, {job.country} · {job.location}
                </Typography.Paragraph>
                <Typography.Paragraph style={{ marginBottom: 4 }}>{formatSalary(job)}</Typography.Paragraph>
                <Typography.Text type="secondary">
                  Posted on {dayjs(job.jobPostedOn).format("YYYY-MM-DD")}
                </Typography.Text>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        title={`Edit: ${editingJob?.title ?? ""}`}
        open={Boolean(editingJob)}
        onOk={handleSave}
        onCancel={() => setEditingJob(null)}
        confirmLoading={saving}
        width={640}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Job Title" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: "Required" }]}>
            <Select options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="country" label="Country" rules={[{ required: true, message: "Required" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City" rules={[{ required: true, message: "Required" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Required" }, { min: 20, message: "At least 20 characters" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="salaryType" label="Salary Type" rules={[{ required: true, message: "Required" }]}>
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={[
                { value: "fixed", label: "Fixed Salary" },
                { value: "ranged", label: "Ranged Salary" },
              ]}
            />
          </Form.Item>
          <SalaryFields salaryType={salaryType} />
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Required" }, { min: 30, message: "At least 30 characters" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyJobsPage;
