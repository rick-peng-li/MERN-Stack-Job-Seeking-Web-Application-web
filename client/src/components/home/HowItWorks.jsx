import { Row, Col, Card, Typography } from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  FileDoneOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { HOW_IT_WORKS } from "@/utils/constants";

const STEP_ICONS = [UserAddOutlined, SearchOutlined, FileDoneOutlined, TrophyOutlined];

const HowItWorks = () => (
  <div style={{ padding: "48px 24px" }}>
    <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
      How It Works
    </Typography.Title>
    <Row gutter={[24, 24]} justify="center">
      {HOW_IT_WORKS.map((step, index) => {
        const Icon = STEP_ICONS[index];
        return (
          <Col xs={24} sm={12} lg={6} key={step.id}>
            <Card hoverable style={{ textAlign: "center", height: "100%" }}>
              <Icon style={{ fontSize: 40, color: "#2563eb", marginBottom: 12 }} />
              <Typography.Title level={4}>
                {index + 1}. {step.title}
              </Typography.Title>
              <Typography.Paragraph type="secondary">{step.description}</Typography.Paragraph>
            </Card>
          </Col>
        );
      })}
    </Row>
  </div>
);

export default HowItWorks;
