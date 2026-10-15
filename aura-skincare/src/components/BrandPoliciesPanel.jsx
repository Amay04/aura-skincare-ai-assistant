
const policies = [
  {
    title: "Shipping",
    icon: "📦",
    details: [
      "Free shipping on orders above ₹499.",
      "Orders below ₹499 have a ₹50 shipping fee.",
      "Standard delivery takes 3–5 business days.",
    ],
  },
  {
    title: "Returns",
    icon: "↩️",
    details: [
      "Returns are accepted within 7 days of delivery.",
      "Products must be unopened and unused.",
      "Original packaging must be retained.",
    ],
  },
  {
    title: "Damaged or Defective Products",
    icon: "🛡️",
    details: [
      "Report damage within 48 hours of delivery.",
      "Photos of the damaged product are required for replacement.",
    ],
  },
  {
    title: "Order Cancellation",
    icon: "✖️",
    details: [
      "Orders can be cancelled while their status is Processing.",
      "Shipped or Out for Delivery orders cannot be cancelled.",
      "Customers may refuse delivery at the doorstep.",
    ],
  },
  {
    title: "Cash on Delivery",
    icon: "💳",
    details: [
      "COD is available for orders up to ₹2,500.",
      "Pay by cash or UPI at the doorstep.",
    ],
  },
];

function BrandPoliciesPanel() {
  return (
    <section className="rounded-2xl border border-[#e5e7df] bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#233b2d]">
          Brand Policies
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Quick reference for Aria's customer support responses.
        </p>
      </div>

      <div className="space-y-3">
        {policies.map((policy) => (
          <details
            key={policy.title}
            className="group rounded-xl border border-[#e8ebe4] bg-[#fcfcf9] p-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">
                  {policy.icon}
                </span>

                <span className="font-medium text-[#304b38]">
                  {policy.title}
                </span>
              </div>

              <span className="text-gray-400 transition group-open:rotate-180">
                ↓
              </span>
            </summary>

            <ul className="mt-3 space-y-2 pl-2">
              {policy.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-2 text-sm leading-6 text-gray-600"
                >
                  <span className="text-[#6b8a70]">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

export default BrandPoliciesPanel;
