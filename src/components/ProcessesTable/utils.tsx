import { Process } from "@/models/process.model";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Process>();

export const columns = [
  columnHelper.accessor("command", {
    cell: (info) => info.getValue(),
    header: "Command",
  }),
];
