const orders = require("../data/orders");
const policies = require("../data/policies");

// Tool 1: Retrieve order details
function getOrderDetails(orderId) {
  const normalizedId = orderId.trim().toUpperCase();

  const order = orders.find(
    (item) => item.id === normalizedId
  );

  if (!order) {
    return {
      success: false,
      message: `Order ${normalizedId} was not found.`,
    };
  }

  return {
    success: true,
    order,
  };
}

// Tool 2: Check cancellation eligibility
function checkCancellationEligibility(orderId) {
  const result = getOrderDetails(orderId);

  if (!result.success) {
    return result;
  }

  const order = result.order;

  const eligible =
    policies.cancellation.allowedStatuses.includes(
      order.status
    );

  return {
    success: true,
    orderId: order.id,
    status: order.status,
    eligible,
    message: eligible
      ? "This order is eligible for cancellation."
      : "This order cannot be cancelled in its current status.",
    alternative: eligible
      ? null
      : policies.cancellation.alternative,
  };
}

// Tool 3: Retrieve brand policies
function getBrandPolicies() {
  return {
    shipping: {
      freeShippingAbove: policies.shipping.freeShippingAbove,
      shippingFeeBelowThreshold:
        policies.shipping.shippingFeeBelowThreshold,
      deliveryTime: policies.shipping.deliveryTime,
    },
    returns: policies.returns,
    damagedProducts: policies.damagedProducts,
    cancellation: policies.cancellation,
    cashOnDelivery: policies.cashOnDelivery,
  };
}

// Functions available to the AI model
const ariaTools = [
  {
    type: "function",
    name: "get_order_details",
    description:
      "Retrieve verified order details using an order ID. Use this when a customer asks about an order, its status, courier, tracking, or delivery.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "Order ID, for example ORD-101",
        },
      },
      required: ["order_id"],
      additionalProperties: false,
    },
    strict: true,
  },
  {
    type: "function",
    name: "check_cancellation_eligibility",
    description:
      "Check whether an order is eligible for cancellation. This only checks eligibility; it does not cancel the order.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "Order ID, for example ORD-103",
        },
      },
      required: ["order_id"],
      additionalProperties: false,
    },
    strict: true,
  },
  {
    type: "function",
    name: "get_brand_policies",
    description:
      "Retrieve Aura Skincare's official shipping, returns, damaged-product, cancellation, and cash-on-delivery policies.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: false,
    },
    strict: true,
  },
];

// Execute the function requested by the AI
function executeAriaTool(name, args) {
  switch (name) {
    case "get_order_details":
      return getOrderDetails(args.order_id);

    case "check_cancellation_eligibility":
      return checkCancellationEligibility(args.order_id);

    case "get_brand_policies":
      return getBrandPolicies();

    default:
      throw new Error(`Unknown AI tool: ${name}`);
  }
}

module.exports = {
  ariaTools,
  executeAriaTool,
};