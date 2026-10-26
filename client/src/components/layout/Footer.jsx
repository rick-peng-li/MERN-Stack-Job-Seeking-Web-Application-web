import { Layout, Typography } from "antd";

const Footer = () => (
  <Layout.Footer style={{ textAlign: "center", background: "#fff", borderTop: "1px solid #f0f0f0" }}>
    <Typography.Text type="secondary">
      JobZee ©{new Date().getFullYear()} — Built with the MERN Stack. All Rights Reserved.
    </Typography.Text>
  </Layout.Footer>
);

export default Footer;
