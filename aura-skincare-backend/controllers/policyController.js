
const policies = require("../data/policies");

const getPolicies = (req, res) => {
  res.status(200).json({
    success: true,
    policies: {
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
    },
  });
};

const checkCancellationEligibility = (req, res) => {
  const orderId = req.params.orderId.trim().toUpperCase();

  const orders = require("../data/orders");

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order ${orderId} was not found.`,
    });
  }

  const eligible = policies.cancellation.allowedStatuses.includes(
    order.status
  );

  return res.status(200).json({
    success: true,
    orderId: order.id,
    currentStatus: order.status,
    eligible,
    message: eligible
      ? "This order is eligible for cancellation."
      : `This order cannot be cancelled while its status is ${order.status}.`,
    alternative: eligible
      ? null
      : policies.cancellation.alternative,
  });
};

module.exports = {
  getPolicies,
  checkCancellationEligibility,
};
