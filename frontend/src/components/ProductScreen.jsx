import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { Rating, Loader, Message } from '../components';
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { id: productId } = useParams();

    const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);
    const [createReview, { isloading: reviewsLoading }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);


    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();

            refetch();

            toast.success('review was submitted successfully!')
            setRating(0);
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }
    return (
        <>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (<><Link to='/' className="btn btn-light my-3">
                Go Back
            </Link>
                <>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid></Image>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} Reviews`}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qunatity</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map((index) => (
                                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button className="btn-block" type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
                <Row className="review">
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message> No reviews</Message>}
                        <ListGroup variant='flush'>
                            {
                                product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}></Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))
                            }
                            <ListGroup.Item>
                                <h2>Please, leave a Review</h2>

                                {reviewsLoading && <Loader></Loader>}

                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating" className='my-2'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="comment" className='my-2'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="" disabled={reviewsLoading}>Add Review</Button>
                                    </Form>
                                ) : (<>

                                    <Message>Please <Link to='/'>login</Link> to leave a reveiw</Message>
                                    <Button variant='danger' onClick={handleLogin}>Login Page</Button>
                                </>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>

            </>)}

        </>
    )
}

export default ProductScreen