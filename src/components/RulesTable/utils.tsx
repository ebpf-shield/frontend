import { RuleAction, RuleChain, RuleSchema } from "@/models/rule.model";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DeleteFirewallRuleDialog } from "./DeleteFirewallRuleDialog";
import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";

const columnHelper = createColumnHelper<RuleSchema>();

const getChainColor = (chain?: RuleChain) => {
  switch (chain) {
    case "INPUT":
      return "bg-purple-600 text-white";
    case "OUTPUT":
      return "bg-blue-600 text-white";
    default:
      return "bg-gray-500";
  }
};

const getActionColor = (action?: RuleAction) => {
  switch (action) {
    case "ACCEPT":
      return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
    case "DROP":
      return "bg-gradient-to-r from-red-500 to-rose-500 text-white";
    case "REJECT":
      return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    default:
      return "bg-gray-500";
  }
};

export const columns = [
  columnHelper.accessor("chain", {
    header: "Chain",
    cell: (info) => {
      return (
        <Badge className={`${getChainColor(info.getValue())} border-none`}>
          {info.getValue() || "—"}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("action", {
    header: "Action",
    cell: (info) => {
      return (
        <Badge className={`${getActionColor(info.getValue())} border-none`}>
          {info.getValue() || "—"}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("saddr", {
    header: "Source Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sport", {
    header: "Source Port",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("daddr", {
    header: "Destination Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dport", {
    header: "Destination Port",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("protocol", {
    header: "Protocol",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("comment", {
    header: "Comment",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    // TODO: Might be a good call to move this to the separate component we have.
    cell: function CellComponent({ row }) {
      const rowData = row.original;
      const { handleOpenEditModal, setDefaultRule: setRule } = useFirewallRuleFormDialogContext();

      const handleEditRule = () => {
        setRule(rowData);
        handleOpenEditModal();
      };

      return (
        <>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
            aria-label="Edit"
            onClick={handleEditRule}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <DeleteFirewallRuleDialog ruleId={rowData._id} processId={rowData.processId} />
        </>
      );
    },
  }),
];
