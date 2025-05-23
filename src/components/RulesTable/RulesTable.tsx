import { cn } from "@/lib/utils";
import { RuleSchema } from "@/models/rule.model";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { columns } from "./utils";

export interface RulesTableProps {
  data: RuleSchema[];
}

export const RulesTable = ({ data }: RulesTableProps) => {
  const table = useReactTable<RuleSchema>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className="rounded-md border overflow-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-muted text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={cn("px-2 py-2 text-left font-medium border-b", {})}>
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
            <tr
              key={row.id}
              className="even:bg-muted/40 transition-colors hover:bg-gray-700/20 overflow-auto text-left"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={cn("px-2 py-2 border-b", {})}>
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
                  className="px-2 py-2 text-left font-medium border-t border-muted text-wrap"
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
