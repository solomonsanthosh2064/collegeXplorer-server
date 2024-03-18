const Order = require("../modals/order")
const User = require("../modals/user")

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, items, shopId } = req.body;
    const newOrder = new Order({
      user: user,
      items: items.map((order) => ({
        product: order.product,
        quantity: order.quantity,
      })),
      shopId: shopId,
    });

    const savedOrder = await newOrder.save();

    await User.findByIdAndUpdate(user, { $push: { orders: savedOrder._id } });
    // console.log("Order created:", savedOrder)
    res.json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    // console.log("All orders:", orders)
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
  }
};

const getAllOrdersForShop = async (req, res) => {
  try {
    const shopId = req.params.shopId;

    if (!shopId) {
      return res.status(400).json({ error: "Shop ID is required" });
    }

    const orders = await Order.find({ shopId })
      .populate("user")
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllOrdersForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ error: "Shop ID is required" });
    }

    const orders = await Order.find({ user: userId }).populate("items.product");
    console.log(orders);
    console.log(userId);
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an order status by ID
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      isOrderComplete: true,
    });

    // console.log("Updated order:", updatedOrder)
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(id);
    // console.log("Deleted order:", deletedOrder)
    res.json(deletedOrder);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getAllOrdersForShop,
  getAllOrdersForUser,
  updateOrder,
  deleteOrder,
};
