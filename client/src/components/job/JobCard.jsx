import { Card, Tag, Typography, Button } from "antd";
import { EnvironmentOutlined, PayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatSalary } from "@/utils/constants";

const JobCard = ({ job }) => (
  <Card
    hoverable
    title={job.title}
    extra={<Tag color="blue">{job.category}</Tag>}
    actions={[
      <Link key="detail" to={`/job/${job._id}`}>
        <Button type="link">Job Details</Button>
      </Link>,
    ]}
  >
    <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
      <EnvironmentOutlined /> {job.city}, {job.country} · {job.location}
    </Typography.Paragraph>
    <Typography.Paragraph style={{ marginBottom: 0 }}>
      <PayCircleOutlined style={{ color: "#2563eb" }} /> {formatSalary(job)}
    </Typography.Paragraph>
  </Card>
);

export default JobCard;
