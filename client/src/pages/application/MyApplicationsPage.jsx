import { useCallback, useEffect, useState } from "react";
import { Card, List, Button, Popconfirm, Image, Typography, Spin, Empty, Avatar } from "antd";
import { DeleteOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { applicationApi } from "@/api/applicationApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";

const ApplicationCard = ({ application, onDelete }) => (
  <Card>
    <List.Item.Meta
      avatar={<Avatar size={48} style={{ backgroundColor: "#2563eb" }}>{application.name?.[0]}</Avatar>}
      title={<Typography.Text strong>{application.name}</Typography.Text>}
      description={
        <>
          <p style={{ margin: 0 }}><MailOutlined /> {application.email}</p>
          <p style={{ margin: 0 }}><PhoneOutlined /> {application.phone}</p>
          <p style={{ margin: 0 }}><HomeOutlined /> {application.address}</p>
          <Typography.Paragraph style={{ marginTop: 8, marginBottom: 0 }} type="secondary">
            Cover Letter: {application.coverLetter}
          </Typography.Paragraph>
        </>
      }
    />
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
      <Image width={96} height={120} style={{ objectFit: "cover" }} src={application.resume.url} alt="resume" />
      {onDelete && (
        <Popconfirm title="Withdraw this application?" onConfirm={() => onDelete(application._id)}>
          <Button danger icon={<DeleteOutlined />}>Withdraw Application</Button>
        </Popconfirm>
      )}
    </div>
  </Card>
);

const MyApplicationsPage = () => {
  const { user } = useAuth();
  const { message } = useMessage();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const isEmployer = user?.role === "Employer";

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = isEmployer
        ? await applicationApi.getAllForEmployer()
        : await applicationApi.getAllForSeeker();
      setApplications(data.applications);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmployer]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDelete = async (id) => {
    try {
      const data = await applicationApi.remove(id);
      message.success(data.message);
      setApplications((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        {isEmployer ? "Applications From Job Seekers" : "My Applications"}
      </Typography.Title>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <Spin size="large" />
        </div>
      ) : applications.length === 0 ? (
        <Empty description="No Applications Found" />
      ) : (
        <List
          grid={{ gutter: 24, column: 1 }}
          dataSource={applications}
          renderItem={(application) => (
            <List.Item>
              <ApplicationCard
                application={application}
                onDelete={isEmployer ? null : handleDelete}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default MyApplicationsPage;
