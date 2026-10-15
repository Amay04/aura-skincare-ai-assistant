
import { useState } from "react";
import { orders } from "../data/order";

function SampleOrdersPanel() {
  const [copiedId, setCopiedId] = useState("");

  const handleCopy = async (orderId) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedId(orderId);

      setTimeout(() => {
        setCopiedId("");
      }, 1500);
    } catch (error) {
      console.error("Unable to copy order ID:", error);
    }
  };

  return (
    <section className="rounded-2xl border border-[#e5e7df] bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#233b2d]">
          Sample Orders
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Use these orders to test Aria's customer support.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-[#e8ebe4] bg-[#fcfcf9] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-[#304b38]">
                {order.id}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Processing"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <h3 className="mt-3 font-medium text-gray-800">
              {order.product}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Customer: {order.customer}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Order value: ₹{order.value}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {order.notes}
            </p>

            {order.courier && (
              <p className="mt-2 text-sm text-gray-600">
                Courier: {order.courier}
              </p>
            )}

            {order.tracking && (
              <p className="mt-1 text-sm text-gray-600">
                Tracking: {order.tracking}
              </p>
            )}

            <button
              type="button"
              onClick={() => handleCopy(order.id)}
              className="mt-4 rounded-lg border border-[#cbd6c9] px-3 py-2 text-sm font-medium text-[#304b38] transition hover:bg-[#edf3eb]"
            >
              {copiedId === order.id ? "Copied!" : "Copy Order ID"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SampleOrdersPanel;
