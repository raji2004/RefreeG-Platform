import React from "react";
import { CheckCircle, Clock } from "lucide-react"; // Icons for status badges

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "In progress" | "Completed";
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const dummyTransactions: Transaction[] = [
  { id: "300", date: "10-05-25", amount: 3000000, status: "In progress" },
  { id: "301", date: "10-05-25", amount: 1500000, status: "Completed" },
  { id: "302", date: "10-05-25", amount: 500000, status: "In progress" },
];

const TransactionsTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
        <a href="#" className="text-gray-500 text-sm hover:underline">
          See all
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Date and time
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Amount donated
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-2"></th>{" "}
              {/* Placeholder for options menu */}
            </tr>
          </thead>
          <tbody>
            {dummyTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="px-4 py-3 text-sm">#{transaction.id}</td>
                <td className="px-4 py-3 text-sm">{transaction.date}</td>
                <td className="px-4 py-3 text-sm font-semibold">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full font-medium ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {transaction.status === "Completed" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
