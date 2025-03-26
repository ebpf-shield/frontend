import { DATE_LOCALS, DATE_OPTIONS } from "@/constants/date.constants";
import { Link } from "@tanstack/react-router";
import { Agent } from "@/models/agent.model";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Agent>();
export const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue().toLocaleString(DATE_LOCALS, DATE_OPTIONS),
    header: "Created At",
  }),
  columnHelper.accessor("updatedAt", {
    cell: (info) => info.getValue().toLocaleString(DATE_LOCALS, DATE_OPTIONS),
    header: "Updated At",
  }),
  columnHelper.display({
    id: "actions",
    cell(props) {
      return (
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          to="/agents/$agentId"
          params={{ agentId: props.row.original._id }}
        >
          Go to agent
        </Link>
      );
    },
  }),
];
