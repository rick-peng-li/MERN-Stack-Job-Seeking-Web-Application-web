import { App as AntdApp } from "antd";

// Shared message / modal instances bound to the antd App context
export const useMessage = () => {
  const { message, modal } = AntdApp.useApp();
  return { message, modal };
};
