import { FC, PropsWithChildren } from "react";
import { Menu } from "../../Menu";

export const PageLayout:FC<PropsWithChildren<Record<string, unknown>>> = ({children}) => {
	return (
    <div className="flex w-12">
      <div className="w-menu m-0">
        <Menu/>
      </div>
      <div className="w-12 py-10 pl-5 pr-10">
        {children}
      </div>
    </div>
	);
};
