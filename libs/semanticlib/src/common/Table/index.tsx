import { FC } from "react";
import { TableProps } from "./Table.types";
import { Empty } from "./Empty";
import { Table as TableComponent } from "semantic-ui-react";

export const Table: FC<TableProps> = ({ rows }) => {
	return (
		<>
			{!rows?.length && <Empty />}
			{!!rows?.length && (
        <TableComponent fixed>
          <TableComponent.Header>
            <TableComponent.Row>
              {Object.values(rows[0]).map((
item, i
) => (
                <TableComponent.HeaderCell key={i}>
                  {item.title}
                </TableComponent.HeaderCell>
              ))}
            </TableComponent.Row>
          </TableComponent.Header>

          <TableComponent.Body>
            {rows.map((
row, index
) => (
              <TableComponent.Row key={index}>
                {Object.values(row).map((
item, i
) => (
                  <TableComponent.Cell
width={4}
key={i}
                  >
                    {item.component}
                  </TableComponent.Cell>
                ))}
              </TableComponent.Row>
            ))}
          </TableComponent.Body>
        </TableComponent>
			)}
		</>
	);
};
