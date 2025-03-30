import { Rule, RuleAction, RuleChain } from "@/models/rule.model";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

const columnHelper = createColumnHelper<Rule>();

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
];
