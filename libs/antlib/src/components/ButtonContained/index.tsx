import { FC, PropsWithChildren } from "react";
import { buttonSx } from "./ButtonContained.sx";
import {
	Button, theme, ButtonProps 
} from "antd";

export const ButtonContained: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	...rest
}) => {
	const { useToken } = theme;
	const { token } = useToken();

	return (
    <Button
type="primary"
style={buttonSx(token)}
{...rest}
    >
      {children}
    </Button>
	);
};
