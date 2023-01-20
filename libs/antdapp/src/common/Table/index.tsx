import { FC } from "react";
import { Table as AntTable, TableProps } from "antd";

export const Table: FC<TableProps<object>> = ({ dataSource, columns, ...rest}) => {
	return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      {...rest}
    />
	);
};
