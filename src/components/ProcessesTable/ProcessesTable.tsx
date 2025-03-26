import { Process } from "@/models/process.model";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { columns } from "./utils";

export interface ProcessesTableProps {
  data: Process[];
}

export const ProcessesTable = ({ data }: ProcessesTableProps) => {
  const table = useReactTable<Process>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div></div>;
};
