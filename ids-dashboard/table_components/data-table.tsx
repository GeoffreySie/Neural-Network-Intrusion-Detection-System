"use client";

import * as React from "react";
import {
  VisibilityState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      "Fwd Packet Length Max": false,
      "Fwd Packet Length Mean": false,
      "Fwd Packet Length Std": false,
      "Bwd Packet Length Max": false,
      "Bwd Packet Length Mean": false,
      "Bwd Packet Length Std": false,
      "Flow Bytes/s": false,
      "Flow Packets/s": false,
      "Flow IAT Mean": false,
      "Flow IAT Std": false,
      "Flow IAT Max": false,
      "Flow IAT Min": false,
      "Fwd IAT Total": false,
      "Fwd IAT Mean": false,
      "Fwd IAT Std": false,
      "Fwd IAT Max": false,
      "Fwd IAT Min": false,
      "Bwd IAT Total": false,
      "Bwd IAT Mean": false,
      "Bwd IAT Std": false,
      "Bwd IAT Max": false,
      "Bwd IAT Min": false,
      "Fwd PSH Flags": false,
      "Fwd Header Length": false,
      "Bwd Header Length": false,
      "Fwd Packets/s": false,
      "Bwd Packets/s": false,
      "Packet Length Max": false,
      "Packet Length Mean": false,
      "Packet Length Std": false,
      "Packet Length Variance": false,
      "SYN Flag Count": false,
      "URG Flag Count": false,
      "Avg Packet Size": false,
      "Subflow Fwd Bytes": false,
      "Subflow Bwd Bytes": false,
      "Init Fwd Win Bytes": false,
      "Init Bwd Win Bytes": false,
      "Fwd Act Data Packets": false,
      "Fwd Seg Size Min": false,
      "Active Mean": false,
      "Active Std": false,
      "Active Max": false,
      "Active Min": false,
      "Idle Mean": false,
      "Idle Std": false,
      "Idle Max": false,
      "Idle Min": false,
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
