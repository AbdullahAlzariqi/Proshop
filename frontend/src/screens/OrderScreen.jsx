import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { Message, Loader } from '../components';
import { useReceiveKeyQuery } from '../slices/checkoutApiSlice'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'
import { loadStripe } from '@stripe/stripe-js';

const OrderScreen = () => {

    const [stripePromise, setStripePromise] = useState(null);
    const { data: stripeObject, isLoading: loads } = useReceiveKeyQuery();
    if (!loads) {
        const key = stripeObject.pubishableKey;
        console.log(key);
    }


    useEffect(() => {

    }, [])

    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)// Refecth will ensure that we do not have stale data
    console.log(order);
    return isLoading ? (<Loader />) : error ? <Message variant='danger'>error</Message> : <>
        <h1>Order ID: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>
                            {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            {order.user.email}
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}/ {order.shippingAddress.country}



                        </p>
                        {order.isDelivered ? (<Message variant='info'>Delivered at {order.deliveredAt}</Message>) :
                            (<Message variant='danger'> Not Delivered</Message>)}
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (<Message variant='info'>Paid On {order.paidAt}</Message>) :
                            (<Message variant='danger'> Not Paid</Message>)}

                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item) => {
                            return (<ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link></Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )
                        })}
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* PAY ORDER PLACEHODLER */}
                        {/* MARK AS DELIVERED */}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>;
}

export default OrderScreen