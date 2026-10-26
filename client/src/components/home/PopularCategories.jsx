import { Row, Col, Card, Typography } from "antd";
import {
  BgColorsOutlined,
  MobileOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  AccountBookOutlined,
  RobotOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { POPULAR_CATEGORIES } from "@/utils/constants";

const CATEGORY_ICONS = [
  BgColorsOutlined,
  MobileOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  AccountBookOutlined,
  RobotOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
];

const PopularCategories = () => (
  <div style={{ padding: "0 24px 48px" }}>
    <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
      Popular Categories
    </Typography.Title>
    <Row gutter={[24, 24]} justify="center">
      {POPULAR_CATEGORIES.map((category, index) => {
        const Icon = CATEGORY_ICONS[index];
        return (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card hoverable style={{ textAlign: "center", height: "100%" }}>
              <Icon style={{ fontSize: 36, color: "#2563eb", marginBottom: 8 }} />
              <Typography.Title level={4} style={{ marginBottom: 4 }}>
                {category.title}
              </Typography.Title>
              <Typography.Text type="secondary">{category.subTitle}</Typography.Text>
            </Card>
          </Col>
        );
      })}
    </Row>
  </div>
);

export default PopularCategories;
