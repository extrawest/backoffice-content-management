import { AppRoutes } from "../routes";
import { AuthProvider } from "../../../../libs/shared/context/Auth";

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
