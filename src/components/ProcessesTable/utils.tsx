import { Process } from "@/models/process.model";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Process>();

export const columns = [
  columnHelper.accessor("command", {
    cell: (info) => info.getValue(),
    header: "Command",
  }),
  columnHelper.accessor("pid", {
    cell: (info) => info.getValue(),
    header: "PID",
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
