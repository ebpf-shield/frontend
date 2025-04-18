import { Process } from "@/models/process.model";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { columns } from "./utils";
import clsx from "clsx";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export interface ProcessesTableProps {
  data: Process[];
}

export const ProcessesTable = ({ data }: ProcessesTableProps) => {
  const table = useReactTable<Process>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className="rounded-md border outline-2 h-[500px]">
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
            <tr key={row.id} className="even:bg-muted/40 transition-colors hover:bg-gray-700/20">
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
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
