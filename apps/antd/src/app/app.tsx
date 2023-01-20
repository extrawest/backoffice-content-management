import { AppRoutes } from "../routes";
import { ConfigProvider } from "antd";
import { AuthProvider } from "../../../../libs/shared/context/Auth";
import { theme } from "../../../../libs/antdapp/theme/theme";

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
