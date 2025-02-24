"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

interface DonationHistory {
  id: number;
  amount: number;
  cause: string;
  dateTime: string;
  transactionId: string;
  paymentMethod: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  pagination: PaginationProps;
}

export function DataTable<TData extends { id: number }, TValue>({
  columns,
  data,
  setData,
  pagination: { pageIndex, pageSize, setPageIndex, setPageSize },
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const handleDelete = () => {
    const selectedRowIds = Object.keys(rowSelection).map((id) => parseInt(id));
    const newData = data.filter((item) => !selectedRowIds.includes(item.id));
    setData(newData);
    setRowSelection({});
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      rowSelection,
      columnVisibility,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    pageCount: Math.ceil(32 / pageSize), // Assuming total data length is 32
  });

   // ✅ Function to handle delete
   const handleDeleteSelected = () => {
    const selectedRowIds = Object.keys(rowSelection).map(Number);
    const updatedData = data.filter((row) => !selectedRowIds.includes(row.id));
    setData(updatedData);
    setRowSelection({}); // Clear selection after delete
  };

  return (
    <div className="w-11/12 md:w-full">
      <div className="lg:flex items-center gap-4 py-4 flex-wrap">
        <Input
          placeholder="Search across all columns..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm my-2"
        />

        <DateRangePicker onDateChange={() => {}} placeholder="Filter by date range" className="my-2" />

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
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ✅ Trash icon now triggers delete */}
        <Button
          variant="destructive"
          className="ml-2 bg-white"
          onClick={handleDeleteSelected}
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash className="w-6 h-6 text-gray-500" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between py-4 items-center flex-wrap gap-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="border rounded p-2"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>

          <Button variant="outline" size="sm" onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={data.length < pageSize}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
