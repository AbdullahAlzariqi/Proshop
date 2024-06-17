import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Table, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { setCredentials } from "../slices/authSlice";
import { useEffect } from "react";
import { Loader } from "../components";
import { toast } from 'react-toastify'
import { FaTimes } from "react-icons/fa";
const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery()


    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, userInfo.name, userInfo.email]);
    const errorMessage = <Alert variant="danger">Passwords do not match!</Alert>

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password Do not Match")
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id, name, email, password
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success('profile was updated Successfully')
            } catch (e) {
                toast.error(e?.data?.message || e?.message || e?.errpr)
            }
        }

    }


    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId="name" className="my-2">
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email" className="my-2">
                        <Form.Label><b>Email</b></Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" className="my-2">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="my-2">
                        <Form.Label><b>ConfirmPassword</b></Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter ConfirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                        {password !== confirmPassword && confirmPassword !== "" ? errorMessage : <></>}
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        className="my-2"
                    >Update
                    </Button>
                    {loadingUpdateProfile && (<Loader />)}
                </Form>
            </Col>
            <Col md={9}>
                <h2>Orders</h2>
                {isLoading ? (<Loader></Loader>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) :
                    (
                        <Table striped hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid At</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>

                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) :
                                        < FaTimes style={{ color: 'red' }} />}</td>

                                    <td>{order.isdelivered ? order.deliveredAt.substring(0, 10) :
                                        < FaTimes style={{ color: 'red' }} />}</td>
                                    <td><LinkContainer to={`/orders/${order._id}`}>
                                        <Button className="btn-sm" variant='light'>
                                            Details
                                        </Button>
                                    </LinkContainer></td>
                                </tr>)}
                            </tbody>
                        </Table>
                    )}
            </Col>
        </Row>
    )
}

export default ProfileScreen