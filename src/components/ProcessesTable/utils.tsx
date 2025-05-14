import { cn } from "@/lib/utils";
import { Process, ProcessStatus } from "@/models/process.model";
import { rankItem } from "@tanstack/match-sorter-utils";
import { Link } from "@tanstack/react-router";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

export const processFuzzyFilter: FilterFn<Process> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

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
        <Badge className={cn(`border-none`, getStatusColor(info.getValue()))}>
          {info.getValue()}
        </Badge>
      );
    },
    header: "Status",
  }),
  columnHelper.accessor("command", {
    cell: (info) => info.getValue(),
    header: "Command",
    filterFn: processFuzzyFilter,
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
