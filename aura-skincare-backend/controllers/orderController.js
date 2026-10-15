
const orders = require("../data/orders");

const getAllOrders = (req, res) => {
  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
};

const getOrderById = (req, res) => {
  const orderId = req.params.orderId.trim().toUpperCase();

  const order = orders.find(
    (item) => item.id === orderId
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order ${orderId} was not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    order,
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
};
