import { FC, PropsWithChildren } from "react";
import { Menu } from "../../Menu";

export const PageLayout:FC<PropsWithChildren<Record<string, unknown>>> = ({children}) => {
	return (
    <div className="flex w-12">
      <div className="w-menu m-0">
        <Menu/>
      </div>
      <div className="w-12 p-8">
        {children}
      </div>
    </div>
	);
};
