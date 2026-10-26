import { Row, Col, Card, Typography, Tag } from "antd";
import { WindowsOutlined, CarOutlined, AppleOutlined } from "@ant-design/icons";
import { POPULAR_COMPANIES } from "@/utils/constants";

const COMPANY_ICONS = [WindowsOutlined, CarOutlined, AppleOutlined];

const PopularCompanies = () => (
  <div style={{ padding: "0 24px 56px" }}>
    <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
      Popular Companies
    </Typography.Title>
    <Row gutter={[24, 24]} justify="center">
      {POPULAR_COMPANIES.map((company, index) => {
        const Icon = COMPANY_ICONS[index];
        return (
          <Col xs={24} sm={12} md={8} key={company.id}>
            <Card hoverable style={{ textAlign: "center", height: "100%" }}>
              <Icon style={{ fontSize: 40, color: "#2563eb", marginBottom: 8 }} />
              <Typography.Title level={4} style={{ marginBottom: 4 }}>
                {company.title}
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
                {company.location}
              </Typography.Paragraph>
              <Tag color="blue">{company.openPositions} Open Positions</Tag>
            </Card>
          </Col>
        );
      })}
    </Row>
  </div>
);

export default PopularCompanies;
