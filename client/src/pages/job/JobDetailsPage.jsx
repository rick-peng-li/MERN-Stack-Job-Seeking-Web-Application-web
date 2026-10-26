import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Tag, Button, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { jobApi } from "@/api/jobApi";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { formatSalary } from "@/utils/constants";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { message } = useMessage();
  const [job, setJob] = useState(null);

  useEffect(() => {
    jobApi
      .getById(id)
      .then((data) => setJob(data.job))
      .catch((error) => {
        message.error(error.message);
        navigate("/job/getall");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!job) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 120 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Card
        title={<Typography.Title level={3} style={{ margin: 0 }}>{job.title}</Typography.Title>}
        extra={<Tag color="blue">{job.category}</Tag>}
      >
        <Descriptions
          bordered
          column={1}
          items={[
            { key: "country", label: "Country", children: job.country },
            { key: "city", label: "City", children: job.city },
            { key: "location", label: "Location", children: job.location },
            { key: "salary", label: "Salary", children: formatSalary(job) },
            {
              key: "posted",
              label: "Job Posted On",
              children: dayjs(job.jobPostedOn).format("YYYY-MM-DD HH:mm"),
            },
            { key: "description", label: "Description", children: job.description },
          ]}
        />
        {user?.role === "Job Seeker" && (
          <Button
            type="primary"
            size="large"
            block
            style={{ marginTop: 24 }}
            onClick={() => navigate(`/application/${job._id}`)}
          >
            Apply Now
          </Button>
        )}
      </Card>
    </div>
  );
};

export default JobDetailsPage;
