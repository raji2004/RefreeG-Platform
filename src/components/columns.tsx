// donationHistoryColumn.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DonationHistory } from "@/lib/type";



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
