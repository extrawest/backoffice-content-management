import { FC } from "react";
import { TableProps } from "./Table.types";
import { Empty } from "./Empty";

export const Table: FC<TableProps> = ({ rows}) => {
	return (
		<>
      <div className="flex justify-content-between border-1 border-round-top-md border-300">
        {rows?.map(row => (
            <div
              key={row?.id}
              className="p-2 flex-1"
            >
              <h3 className="text-md m-0">{row?.title}</h3>
            </div>
        ))}
      </div>
      <div className="flex pt-4 border-1 border-top-none border-300">
        {!rows?.[0]?.items?.length && <Empty/>}
        {rows?.map(row => (
          <div
            key={row?.id}
            className="flex flex-column flex-1"
          >
            {row?.items?.map((
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
