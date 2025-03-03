// donationHistoryColumn.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CauseTable, DonationHistory, SignedPetitions } from "@/lib/type";
import { format } from "date-fns"



export const donationHistoryColumn: ColumnDef<DonationHistory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cause",
    header: "Cause List",
  },
  {
    accessorKey: "amount",
    header: "Amount Donated",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ getValue }) => <span>{format(new Date(getValue() as string), "MMM dd, yyyy H:MM a")}</span>,
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
];


export const 
CauseColumns: ColumnDef<CauseTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Causes List",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "metrics",
    header: "Metrics",
    cell: ({ row }) => <div>{row.getValue("metrics")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`capitalize ${
          row.getValue("status") === "Approved"
            ? "text-blue-500"
            : row.getValue("status") === "Pending"
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
];


export const SignedPetitionsColumn: ColumnDef<SignedPetitions>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cause",
    header: "Signed Petitions",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "dates",
    header: "Date",
    cell: ({ getValue }) => <span>{format(new Date(getValue() as string), "MMM dd, yyyy")}</span>,
  },
  {
    accessorKey: "times",
    header: "Time",
  },
]