import { Process } from "@/models/process.model";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns, processFuzzyFilter } from "./utils";

// declare module "@tanstack/react-table" {
//   //add fuzzy filter to the filterFns
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>;
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo;
//   }
// }

export const useProcessTable = (data: Process[]) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable<Process>({
    data,
    columns,
    filterFns: {
      fuzzy: processFuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //client side pagination
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(), //client side sorting needed if you want to use sorting too.
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      globalFilter,
    },
  });

  return { table, globalFilter, setGlobalFilter, pagination, setPagination };
};
