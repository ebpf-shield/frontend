import { Process } from "@/models/process.model";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { columns } from "./utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface ProcessesTableProps {
  data: Process[];
}

export const ProcessesTable = ({ data }: ProcessesTableProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable<Process>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const tableComp = (
    <ScrollArea className="rounded-md border outline-2 h-[400px]">
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

  const paginationComp = (
    <section className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        {">"}
      </Button>
      <Button variant="outline" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
        {">>"}
      </Button>

      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <Input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </section>
  );

  return (
    <section className="flex flex-col gap-4">
      {tableComp}
      {paginationComp}
    </section>
  );
};
