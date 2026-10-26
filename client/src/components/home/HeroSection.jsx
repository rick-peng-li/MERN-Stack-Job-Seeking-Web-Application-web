import { Row, Col, Typography, Statistic, Card } from "antd";
import {
  ProfileOutlined,
  BankOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { HERO_STATS } from "@/utils/constants";

const STAT_ICONS = [ProfileOutlined, BankOutlined, TeamOutlined, UserAddOutlined];

const HeroSection = () => (
  <div style={{ padding: "48px 24px", background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" }}>
    <Row gutter={[48, 48]} align="middle">
      <Col xs={24} md={12}>
        <Typography.Title level={1} style={{ marginBottom: 12 }}>
          Find Your <span style={{ color: "#2563eb" }}>Dream Job</span> Today
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ fontSize: 16 }}>
          Browse thousands of openings from top companies or post your job and reach
          talented candidates worldwide — all in one platform.
        </Typography.Paragraph>
        <Row gutter={[16, 16]}>
          {HERO_STATS.map((item, index) => {
            const Icon = STAT_ICONS[index];
            return (
              <Col xs={12} sm={6} key={item.id}>
                <Card size="small" hoverable>
                  <Statistic
                    title={item.subTitle}
                    value={item.title}
                    prefix={<Icon style={{ color: "#2563eb" }} />}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col xs={24} md={12}>
        <img
          src="/heroS.jpg"
          alt="Find your dream job"
          style={{ width: "100%", borderRadius: 16, boxShadow: "0 12px 32px rgba(37,99,235,0.18)" }}
        />
      </Col>
    </Row>
  </div>
);

export default HeroSection;
