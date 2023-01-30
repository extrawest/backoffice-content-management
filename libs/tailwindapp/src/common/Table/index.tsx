import { FC } from "react";
import { TableProps } from "./Table.types";
import { Empty } from "./Empty";

export const Table: FC<TableProps> = ({ rows}) => {
	return (
		<>
      <div className="flex justify-between border">
        {rows.map(row => (
            <div
              key={row.id}
              className="p-1 flex-1"
            >
              <h3 className="sub-header">{row.title}</h3>
            </div>
        ))}
      </div>
      <div className="flex pt-2 border border-t-0">
        {!rows?.[0]?.items?.length && <Empty/>}
        {rows.map(row => (
          <div
            key={row.id}
            className="flex flex-col flex-1"
          >
            {row.items.map((
              item, i
            ) => (
              <div
                key={i}
                className="p-1 flex-1"
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
		</>
	);
};
