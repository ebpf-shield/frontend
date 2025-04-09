import { Agent } from "@/models/agent.model";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { columns } from "./util";
import { ScrollArea } from "../ui/scroll-area";

interface AgentsTableProps {
  data: Agent[];
}

export const AgentsTable = ({ data }: AgentsTableProps) => {
  const table = useReactTable<Agent>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className="rounded-md border overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-muted text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx("px-4 py-2 text-left font-medium border-b", {
                    "border-r": !header.column.getIsLastColumn(),
                  })}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-muted/50 hover:bg-muted/70 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={clsx("px-4 py-2 border-b", {
                    "border-r": !cell.column.getIsLastColumn(),
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-muted/30">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-medium border-t border-muted"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </ScrollArea>
  );
};
