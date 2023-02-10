import { AppRoutes } from "../routes";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "./styles.scss";
import { AuthProvider } from "@lib/shared";

export function App() {
	return (
    <AuthProvider>
          <AppRoutes />
    </AuthProvider>
	);
}

export default App;
