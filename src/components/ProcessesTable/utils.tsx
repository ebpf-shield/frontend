import { Process, ProcessStatus } from "@/models/process.model";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import clsx from "clsx";

const columnHelper = createColumnHelper<Process>();

export const getStatusColor = (status: ProcessStatus) => {
  switch (status) {
    case "RUNNING":
      return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
    case "STOPPED":
      return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    case "ERROR":
      return "bg-gradient-to-r from-red-500 to-rose-500 text-white";
    default:
      return "bg-gray-500";
  }
};

export const columns = [
  columnHelper.accessor("status", {
    cell: (info) => {
      return (
        <Badge className={clsx(`border-none`, getStatusColor(info.getValue()))}>
          {info.getValue()}
        </Badge>
      );
    },
    header: "Status",
  }),
  columnHelper.accessor("command", {
    cell: (info) => info.getValue(),
    header: "Command",
    filterFn: "fuzzy",
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("count", {
    cell: (info) => info.getValue(),
    header: "Count",
  }),
  columnHelper.display({
    id: "go-to-process",
    cell(props) {
      return (
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          to="/agents/processes/$processId"
          params={{ processId: props.row.original._id }}
        >
          Go to process
        </Link>
      );
    },
  }),
];
