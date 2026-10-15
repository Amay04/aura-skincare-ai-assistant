
const policies = {
  shipping: {
    freeShippingAbove: 499,
    shippingFeeBelowThreshold: 50,
    deliveryTime: "3–5 business days",
    getShippingFee(orderValue) {
      return orderValue > this.freeShippingAbove
        ? 0
        : this.shippingFeeBelowThreshold;
    },
  },

  returns: {
    returnWindowDays: 7,
    conditions: [
      "Product must be unopened",
      "Product must be unused",
      "Original packaging must be retained",
    ],
  },

  damagedProducts: {
    reportingWindowHours: 48,
    photoRequired: true,
  },

  cancellation: {
    allowedStatuses: ["Processing"],
    restrictedStatuses: ["Shipped", "Out for Delivery"],
    alternative: "Customer may refuse delivery at the doorstep.",
  },

  cashOnDelivery: {
    maximumOrderValue: 2500,
    paymentMethods: ["Cash", "UPI"],
    paymentLocation: "At the doorstep",
  },
};

module.exports = policies;
