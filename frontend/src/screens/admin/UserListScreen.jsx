import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck, FaPlus } from 'react-icons/fa';
import { Message, Loader } from '../../components'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();



    const handleDeleteUser = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete a user?')) {
                await deleteUser(id);
                refetch();
                toast.success('User was deleted successfully')
            }

        } catch (e) {
            toast.error(e?.data?.message || e.error)
        }
    };


    const handleCreateUser = () => {
        console.log('delete');
    };



    return (
        <div>
            <>
                <Row>
                    <Col>
                        <h1>Users</h1>
                    </Col>
                    <Col className="text-end">
                        <Button className="btn-sm my-3 " onClick={handleCreateUser}><FaPlus className="my-1"></FaPlus> Create User</Button>
                    </Col>
                </Row>
                {/* {newProductLoading && <div> <Loader></Loader></div>*/}
                {deleteUserLoading && <div> <Loader></Loader></div>}
                {isLoading ? <div>  <Loader></Loader></div> : error ? <Message variant="danger">{error}</Message> :
                    (<>
                        <Table striped hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (<FaCheck style={{ color: 'green' }}></FaCheck>) : <FaTimes style={{ color: 'red' }}></FaTimes>}</td>

                                        <td>
                                            <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                                                <Button variant='light' className="btn-sm mx-2" >
                                                    <FaEdit className="my-1" />
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' onClick={() => handleDeleteUser(user._id)} className="btn-sm" disabled={deleteUserLoading}>
                                                <FaTrash className="my-1 mx-1" style={{ color: "white" }} />
                                            </Button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>)
                }
            </>
        </div>
    );
};

export default UserListScreen;
