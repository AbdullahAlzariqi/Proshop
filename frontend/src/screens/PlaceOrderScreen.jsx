import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { CheckoutSteps, Message, Loader } from '../components';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice.js';
import { clearCartItems } from '../slices/cartSlice.js';
const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
            toast.info("Please add a shipping address")
        } else if (!cart.paymentMethod) {
            navigate('/payment');
            toast.info("Please add a payment method")
        }
    }, [navigate, cart.shippingAddress.address, cart.paymentMethod, toast.info]);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                itemsPrice: cart.ItemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                paymentMethod: cart.paymentMethod

            }).unwrap();

            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postaCode} {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Order Items
                            </h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        ></Image>

                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup cariant='flush'>
                            < ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            {error && <ListGroup.Item>
                                <Message variant='danger'>{error}</Message>
                            </ListGroup.Item>}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    variant="primary"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >CheckOut</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row >
        </>
    )
}

export default PlaceOrderScreen