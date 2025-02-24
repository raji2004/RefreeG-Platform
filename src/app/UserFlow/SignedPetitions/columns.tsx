"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SignedPetitions = {
  id: number
  cause: string
  dates: string,
  times: string,
}

export const columns: ColumnDef<SignedPetitions>[] = [
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