import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { Message, Loader, CheckoutForm } from '../components';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)// Refecth will ensure that we do not have stale data
    if (!isLoading) {
        let price = order.totalPrice;
    }
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    // const { data: stripeObject, isLoading: loads } = useReceiveKeyQuery();
    // if (!loads) {
    //     const key = stripeObject.pubishableKey;
    // }
    const sss = async (url) => {
        const x = await axios.get(url)
        return x
    }
    const postRequest = async (url) => {
        const x = await axios.post(url)
        return x
    }



    const handlePost = async () => {
        const res = await axios.post('/api/payment/create-payment-intent', { "totalPrice": price })
        console.log(res, " is res");
    };


    useEffect(() => {

        try {
            postRequest("/api/payment/create-payment-intent").then(async (r) => {
                const { clientSecret } = await r.data;
                setClientSecret(clientSecret)
            })
        } catch (e) {
            return e.message
        }


    }, [])

    useEffect(() => {

        sss('/api/payment/config').then((res) => {
            const key = res.data.pubishableKey
            setStripePromise(loadStripe(key))
        });


    }, [])



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
                {stripePromise && clientSecret && !order.isPaid && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm />
                    </Elements>
                )}
            </Col>
        </Row>
    </>;
}

export default OrderScreen