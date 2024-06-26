import asyncHandler from '../middleware/asyncHandler.js'
import Order from "../models/orderModel.js";

//@desc Create New Order
//@route POST /api/orders
//@access Private


const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('no order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((item) => ({
                ...item,
                product: item._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(200).json(createdOrder)
    }
    res.send("add Order Items");
})


//@desc Get Logged in Orders
//@route GET /api/orders/myorders
//@access Private


const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders)
})

//@desc Get Order by ID
//@route GET /api/orders/:id
//@access Private


const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404)
        throw new Error('Not Found')
    }
})


//@desc Update Order to paid
//@route PUT /api/orders/:id/pay
//@access Private


const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder)
    } else {
        res.status(404);
        res.send('Order Not found')
    }
})



//@desc Update Order tp delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin


const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("Update Order to Delivered");
})



//@desc Get All Orders
//@route GET /api/orders
//@access Private/Admin


const getOrders = asyncHandler(async (req, res) => {
    res.send("Get All Orders");
})




export { getMyOrders, getOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid, addOrderItems }