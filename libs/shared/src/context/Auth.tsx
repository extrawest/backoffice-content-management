import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseconfig";

type ContextProps = {
	user: User | null;
};

const defaultValues = { user: null };
const Auth = createContext<ContextProps>(defaultValues);

export const AuthProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	onAuthStateChanged(
		auth,
		(currentUser) => {
			setUser(currentUser);
		}
	);

	return (
		<Auth.Provider
			value={{
				user,
			}}
		>
			{children}
		</Auth.Provider>
	);
};

export function useAuth(): ContextProps {
	return useContext(Auth);
}
