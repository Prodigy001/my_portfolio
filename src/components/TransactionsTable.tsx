import { transactions } from "../data";
import IconCaret from "../icons/IconCaret";

const TransactionsTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "text-[#0CAF60] bg-[#EFFBF7]";
      case "Pending":
        return "text-[#FE964A] bg-[#FFF0E6]";
      case "Cancelled":
        return "text-[#FD6A6A] bg-[#FFF0F0]";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 max-md:hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-zabira-dark">
          Recent Transactions
        </h2>
        <a
          href="#"
          className="text-[#0044EE] text-sm font-semibold text-zabira inline-flex items-center"
        >
          View All{" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17L14 12L10 7"
              stroke="#0044EE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-5xl">
          <thead>
            <tr className="border-y border-[#EEEFF2]">
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Channel
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Type
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Amount
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Fee
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Total
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Reference ID
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-[#718096] text-xs">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-[#EEEFF2] hover:bg-gray-50"
              >
                <td className="py-5 px-4 text-[#111827] font-medium">
                  {transaction.channel}
                </td>
                <td className="py-5 px-4">
                  <span className="flex items-center gap-1">
                    {/* <span
                      className={
                        transaction.isPositive
                          ? "text-[#0BA259]"
                          : "text-[#FD6A6A]"
                      }
                    >
                      {transaction.typeIcon}
                    </span> */}
                    {transaction.type === "Deposit" ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3.75V14.25"
                          stroke="#0BA259"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 11.25L9 14.25"
                          stroke="#0BA259"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 11.25L9 14.25"
                          stroke="#0BA259"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3.75V14.25"
                          stroke="#FD6A6A"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 6.75L9 3.75"
                          stroke="#FD6A6A"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 6.75L9 3.75"
                          stroke="#FD6A6A"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                    {transaction.type}
                  </span>
                </td>
                <td className="py-5 px-4  text-[#111827]">
                  {transaction.amount} {transaction.amountCurrency}
                </td>
                <td className="py-5 px-4 text-[#111827]">
                  {transaction.fee} {transaction.feeCurrency}
                </td>
                <td className="py-5 px-4 text-[#111827]">
                  {transaction.total} {transaction.totalCurrency}
                </td>
                <td className="py-5 px-4 text-[#718096] font-mono text-xs">
                  {transaction.referenceId}
                </td>
                <td>
                  <span
                    className={`py-1 rounded-sm px-2 font-semibold  ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-5 px-4 text-[#111827]">
                  <div>{transaction.date}</div>
                  <div className="text-xs text-[#718096]">
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
