import { AppRoutes } from "../routes";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@lib/shared";
import { theme } from "@antlib";

export function App() {
  return (
    <AuthProvider>
      <ConfigProvider theme={{
        token: theme
      }}>
        <AppRoutes />
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
