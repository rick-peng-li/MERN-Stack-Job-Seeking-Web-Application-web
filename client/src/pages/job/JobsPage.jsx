import { useEffect, useState } from "react";
import { Row, Col, Typography, Spin, Empty } from "antd";
import { jobApi } from "@/api/jobApi";
import JobCard from "@/components/job/JobCard";
import { useMessage } from "@/hooks/useMessage";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = useMessage();

  useEffect(() => {
    jobApi
      .getAll()
      .then((data) => setJobs(data.jobs))
      .catch((error) => message.error(error.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        All Available Jobs
      </Typography.Title>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <Spin size="large" />
        </div>
      ) : jobs.length === 0 ? (
        <Empty description="No Jobs Found" />
      ) : (
        <Row gutter={[24, 24]}>
          {jobs.map((job) => (
            <Col xs={24} sm={12} lg={8} key={job._id}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default JobsPage;
