"use client"
import React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, Plus, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays, isWithinInterval, parseISO } from "date-fns"

interface DonationHistory {
    id: number
    cause: string
    amount: number
    dateTime: string  // Ensure "date" is in "YYYY-MM-DD" format
    transactionID: string
    paymentMethod: string
}

interface CauseTable {
    id: number
    name: string
    metrics: number
    status: string
}

interface SignedPetitions {
    id: number
    cause: string
    dates: string  // Ensure "date" is in "YYYY-MM-DD" format
    times: string
}

interface DataTableProps<TData extends object, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterColumn?: string
    filterColumnPlaceholder?: string
    nofilter?: boolean
    addCause?: boolean
}

type DataType = DonationHistory | SignedPetitions | CauseTable;

const getDateKey = (item: DataType): string | null => {
    if ("dateTime" in item) return item.dateTime;
    if ("dates" in item) return item.dates;
    return null;
};

export function DataTable<TData extends object, TValue>({
    columns,
    data,
    filterColumn,
    filterColumnPlaceholder,
    nofilter,
    addCause
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [dateRange, setDateRange] = React.useState<DateRange>({ from: undefined, to: undefined });

    const [tableData, setTableData] = React.useState(data);

    // **Apply Date Range Filtering**
    const filteredData = React.useMemo(() => {
        if (!dateRange.from || !dateRange.to) return tableData;
    
        return tableData.filter((item) => {
            const dateKey = getDateKey(item as DataType);
            if (!dateKey) return false;
    
            const itemDate = parseISO(dateKey);
            return isWithinInterval(itemDate, {
                start: dateRange.from as Date,
                end: dateRange.to as Date,
            });
        });
    }, [tableData, dateRange]); // ✅ Depend on `tableData` instead of `data`
    

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,  // Enable row selection
        state: { columnFilters, rowSelection }
    });

    const handleDelete = () => {
        const selectedRowIds = new Set(Object.keys(rowSelection).map(Number));
        if (selectedRowIds.size === 0) return; // Prevent deletion if nothing is selected
    
        setTableData(prevData => prevData.filter((_, index) => !selectedRowIds.has(index)));
        setRowSelection({}); // Clear selection
    };
    
    
    

    return (
        <div>
            <div className="flex items-end justify-between w-full py-4">
                {!nofilter && (
                    <div className="w-full flex justify-between">
                        <Input
                            placeholder={filterColumnPlaceholder ?? "Search..."}
                            value={(table.getColumn(filterColumn ?? "")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn(filterColumn ?? "")?.setFilterValue(event.target.value)}
                            className="max-w-sm text-xs md:text-sm lg:text-base"
                        />

                        <div className="flex gap-2">

                            {/* Date Range Picker */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="flex text-xs md:text-sm lg:text-base items-center gap-2">
                                        <CalendarIcon size={16} />
                                        {dateRange.from && dateRange.to
                                            ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                                            : "Pick a date range"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 text-xs md:text-sm lg:text-base">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={(range) => range && setDateRange(range)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            {/* Reset Filter Button */}
                            {(dateRange.from || dateRange.to) && (
                                <Button variant="destructive" className="text-xs md:text-sm lg:text-base" onClick={() => setDateRange({ from: undefined, to: undefined })}>
                                    Clear Filter
                                </Button>
                            )}

                        </div>


                    </div>
                )}

                <div className={`${!nofilter ? "" : " ml-auto"}`}>
                    {addCause && (
                        <Link href={'/list_a_cause'} className="inline-flex items-center gap-1 text-primaryShades-800">
                            <Plus size={18} /> Add cause
                        </Link>
                    )}
                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white"
                        onClick={handleDelete}
                        disabled={Object.keys(rowSelection).length === 0}
                    >
                        <Trash size={18} />
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="text-xs md:text-sm lg:text-base">
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
                    <TableBody className="text-xs md:text-sm lg:text-base">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
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
            <div className="flex items-center justify-start space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    &lt;
                </Button>
                {Array.from({ length: table.getPageCount() }, (_, i) => {
                    const isActive = table.getState().pagination.pageIndex === i;
                    return (
                        <Button
                            key={i}
                            size="sm"
                            onClick={() => table.setPageIndex(i)}
                            className={`border border-transparent ${
                                isActive ? "text-[#3353FF] bg-[rgba(51,83,255,0.10)]" : "text-black bg-white"
                            } hover:bg-[rgba(51,83,255,0.10)] hover:text-inherit`}
                        >
                            {i + 1}
                        </Button>
                    );
                })}
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    &gt;
                </Button>
            </div>
        </div>
    );
}

