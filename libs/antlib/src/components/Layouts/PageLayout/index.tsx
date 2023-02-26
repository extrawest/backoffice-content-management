import { FC, PropsWithChildren } from "react";
import { Layout, Space } from "antd";
import { Menu } from "../../Menu";
import {
	contentSx, menuBoxSx, pageBoxSx 
} from "./PageLayout.sx";

export const PageLayout: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children,
}) => {
	return (
    <Layout.Content style={pageBoxSx}>
      <Space style={menuBoxSx}>
        <Menu />
      </Space>
      <Layout.Content style={contentSx}>{children}</Layout.Content>
    </Layout.Content>
	);
};
