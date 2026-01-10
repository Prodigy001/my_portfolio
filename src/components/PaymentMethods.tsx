import { Link } from "react-router-dom";
import { paymentMethods } from "../data";
import IconLighting from "../icons/IconLighting";

const PaymentMethods = () => {
  return (
    <section className="md:bg-white rounded-2xl md:p-6 mb-6">
      <h4 className="flex max-md:hidden items-center gap-2 font-semibold text-lg text-zabira text-[#1A1A1A] mb-6">
        <span className="text-zabira-green text-[1.25rem]">
          <IconLighting />
        </span>
        Start Making Payments
      </h4>

      <ul className="grid grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 w-full">
        {paymentMethods.map((paymentMethod) => {
          const { id, name, icon: Icon, description, color } = paymentMethod;

          const getPath = (id: string) => {
            const pathMap: Record<string, string> = {
              giftcard: "/dashboard/giftcard",
              crypto: "/dashboard/wallet",
              paybills: "/dashboard/bill-payment",
              paylink: "/dashboard/wallet",
              rates: "/dashboard/wallet",
              betting: "/dashboard/wallet",
            };
            return pathMap[id] || "/dashboard";
          };

          return (
            <Link
              key={id}
              to={getPath(id)}
              className="p-4 rounded-xl border border-[#F4F4F5] max-md:text-center no-underline block hover:shadow-md transition-shadow"
            >
              <div
                style={{ backgroundColor: color }}
                className="rounded-full max-md:mx-auto flex items-center justify-center aspect-square w-9 text-white text-[1.25rem]"
              >
                <Icon />
              </div>

              <h6 className="mt-3 text-zabira-dark text-sm md:text-base text-zabira font-medium md:font-semibold ">
                {name}
              </h6>

              <p className="text-zabira-dark/36 font-medium text-sm text-zabira mt-1.5 max-md:hidden">
                {description}
              </p>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default PaymentMethods;
