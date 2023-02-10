import { AuthProvider } from "@lib/shared";
import { AppRoutes } from "../routes";

export function App() {
	return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
	);
}

export default App;
