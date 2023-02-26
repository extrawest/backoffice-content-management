import { FC, PropsWithChildren } from "react";
import { Menu } from "../../Menu";

export const PageLayout: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children,
}) => {
	return (
    <div className="flex w-full">
      <div className="w-menu">
        <Menu />
      </div>
      <div className="w-full py-10 pl-5 pr-10">{children}</div>
    </div>
	);
};
