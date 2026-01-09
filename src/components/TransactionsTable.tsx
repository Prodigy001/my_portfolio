import { transactions } from "../data";

const TransactionsTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "text-green-500";
      case "Pending":
        return "text-orange-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 max-md:hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <a href="#" className="text-blue-600 text-sm font-medium">
          View All →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Channel
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Type
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Amount
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Fee
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Total
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Reference ID
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-gray-900 font-medium">
                  {transaction.channel}
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1">
                    <span
                      className={
                        transaction.isPositive
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.typeIcon}
                    </span>
                    {transaction.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {transaction.amount} {transaction.amountCurrency}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {transaction.fee} {transaction.feeCurrency}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {transaction.total} {transaction.totalCurrency}
                </td>
                <td className="py-4 px-4 text-blue-600 font-mono text-xs">
                  {transaction.referenceId}
                </td>
                <td
                  className={`py-4 px-4 font-semibold ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <div>{transaction.date}</div>
                  <div className="text-xs text-gray-500">
                    {transaction.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
